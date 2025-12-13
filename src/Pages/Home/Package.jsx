import React, { useEffect, useState } from 'react';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        setErrMsg('');
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
        setErrMsg(err.message);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-4">
        Subscription Packages
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        Start with Basic and scale up as your team grows. All packages come with
        core asset tracking and employee management features.
      </p>

      {loading && <p className="text-center">Loading packages...</p>}
      {errMsg && <p className="text-center text-red-500">{errMsg}</p>}

      {!loading && !errMsg && (
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div
              key={pkg._id || pkg.name}
              className="card bg-base-100 shadow-md border border-base-200"
            >
              <div className="card-body items-center text-center">
                <h3 className="card-title text-[#1E5631] mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-[#28A745] mb-1">
                  ${pkg.price}
                  <span className="text-sm font-normal text-gray-500">
                    /month
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Up to {pkg.employeeLimit} employees
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {pkg.features?.map((f, idx) => (
                    <li key={idx}>• {f}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <button className="btn btn-primary btn-sm">
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Package;
