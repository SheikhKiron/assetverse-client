import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ===== Payment Form (Modal er vitore) =====
const PaymentForm = ({ selectedPackage, hrEmail, onClose, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) {
      alert('Stripe is not loaded yet.');
      return;
    }

    try {
      setLoading(true);

      // 1) Backend theke PaymentIntent create koro
      const intentRes = await fetch(
        'https://assetverse-server-nine.vercel.app/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            packageName: selectedPackage.name,
            hrEmail,
          }),
        }
      );

      const intentData = await intentRes.json();
      if (!intentRes.ok) {
        throw new Error(intentData.msg || 'Failed to create payment intent');
      }

      const clientSecret = intentData.clientSecret;

      // 2) Stripe diye payment confirm koro
      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              email: hrEmail,
            },
          },
        }
      );

      if (error) {
        console.error(error);
        throw new Error(error.message || 'Payment failed');
      }

      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not successful');
      }

      // 3) Payment success --> backend e package upgrade call
      const upgradeRes = await fetch(
        'https://assetverse-server-nine.vercel.app/hr/upgrade',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hrEmail,
            packageName: selectedPackage.name,
          }),
        }
      );

      const upgradeData = await upgradeRes.json();
      if (!upgradeRes.ok) {
        throw new Error(upgradeData.msg || 'Upgrade failed');
      }

      alert(
        `Payment successful! Upgraded to ${upgradeData.packageName} (limit: ${upgradeData.employeeLimit})`
      );

      onSuccess && onSuccess(upgradeData);
      onClose && onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="font-semibold">
        Package: {selectedPackage.name} — ${selectedPackage.price} / month
      </p>
      <div className="p-3 border rounded-md bg-base-100">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': { color: '#a0aec0' },
              },
              invalid: { color: '#e53e3e' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        className="btn w-full text-white"
        style={{ backgroundColor: '#28A745' }}
        disabled={!stripe || loading}
      >
        {loading
          ? 'Processing Payment...'
          : `Pay $${selectedPackage.price} & Upgrade`}
      </button>

      <button
        type="button"
        className="btn btn-ghost w-full mt-2"
        onClick={onClose}
      >
        Cancel
      </button>
    </form>
  );
};

// ===== Main UpgradePackage Page =====
const UpgradePackage = () => {
  const { appUser } = useAuth(); // AuthProvider theke backend user
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pkgError, setPkgError] = useState('');
  const [selectedPkg, setSelectedPkg] = useState(null);

  // Packages load kora
  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        setPkgError('');
        const res = await fetch(
          'https://assetverse-server-nine.vercel.app/packages'
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.msg || 'Failed to load packages');
        }
        setPackages(data);
      } catch (err) {
        console.error(err);
        setPkgError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (!appUser) return <p>Please login as HR to view this page.</p>;
  if (appUser.role !== 'hr')
    return <p>Only HR Managers can upgrade packages.</p>;

  if (loading) return <p>Loading packages...</p>;
  if (pkgError) return <p className="text-red-500">Error: {pkgError}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#1E5631]">
        Upgrade Package
      </h2>

      {/* Current HR subscription info */}
      <div className="mb-4 p-3 border rounded-md bg-base-100">
        <p>
          Current Subscription:{' '}
          <span className="font-semibold capitalize">
            {appUser.subscription || 'basic'}
          </span>
        </p>
        <p>
          Employee Limit:{' '}
          <span className="font-semibold">
            {appUser.packageLimit || 5} employees
          </span>
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div
            key={pkg._id || pkg.name}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body">
              <h3 className="card-title text-[#1E5631]">{pkg.name}</h3>
              <p className="text-3xl font-bold text-[#28A745]">
                ${pkg.price}
                <span className="text-sm font-normal text-gray-500">
                  /month
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Employee Limit: {pkg.employeeLimit}
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {pkg.features?.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
              <div className="card-actions mt-4">
                <button
                  className="btn w-full text-white"
                  style={{ backgroundColor: '#28A745' }}
                  onClick={() => setSelectedPkg(pkg)}
                >
                  Upgrade to {pkg.name}
                </button>
              </div>
            </div>
          </div>
        ))}
        {packages.length === 0 && <p>No packages configured yet.</p>}
      </div>

      {/* Payment Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-[#1E5631]">
              Pay & Upgrade — {selectedPkg.name}
            </h3>
            <Elements stripe={stripePromise}>
              <PaymentForm
                selectedPackage={selectedPkg}
                hrEmail={appUser.email}
                onClose={() => setSelectedPkg(null)}
                onSuccess={updated => {
                  // চাইলে frontend-এর appUser state আপডেট করতে পারো
                  // এখন শুধু alert দিয়ে রেখেছি; চাইলে এখানে refresh logic বসাবে
                  console.log('Upgraded:', updated);
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpgradePackage;
