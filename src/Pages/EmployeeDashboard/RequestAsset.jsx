// src/Pages/EmployeeDashboard/RequestAsset.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const RequestAsset = () => {
  const { appUser } = useAuth(); // backend user, employee
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState('');

  // load available assets
  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        setErrMsg('');

        const res = await fetch(
          'https://assetverse-server-nine.vercel.app/hr/assets'
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Failed to load assets');

        const list = Array.isArray(data) ? data : [];
        const available = list.filter(
          a => (a.availableQuantity ?? a.productQuantity ?? 0) > 0
        );
        setAssets(available);
      } catch (err) {
        console.error(err);
        setErrMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const openModal = asset => {
    if (!appUser || appUser.role !== 'employee') {
      alert('Only employees can request assets.');
      return;
    }
    setSelectedAsset(asset);
    setNote('');
    document.getElementById('request-modal')?.showModal();
  };

  const closeModal = () => {
    setSelectedAsset(null);
    document.getElementById('request-modal')?.close();
  };

  const handleRequestSubmit = async e => {
    e.preventDefault();
    if (!selectedAsset || !appUser) return;

    try {
      setErrMsg('');

      const body = {
        assetId: selectedAsset._id,
        assetName: selectedAsset.productName,
        assetType: selectedAsset.productType,
        companyName: selectedAsset.companyName,
        hrEmail: selectedAsset.hrEmail,
        assetImage: selectedAsset.productImage,
        requesterName: appUser.name,
        requesterEmail: appUser.email,
        note,
      };

      const res = await fetch(
        'https://assetverse-server-nine.vercel.app/employee/requests',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to create request');

      alert('Request submitted successfully!');
      closeModal();
    } catch (err) {
      console.error(err);
      setErrMsg(err.message);
    }
  };

  if (!appUser || appUser.role !== 'employee')
    return <p>Please login as Employee to request assets.</p>;
  if (loading) return <p>Loading assets...</p>;
  if (errMsg) return <p className="text-red-500">{errMsg}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">
        Request an Asset
      </h2>

      {assets.length === 0 ? (
        <p>No assets available right now.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {assets.map(asset => (
            <div
              key={asset._id}
              className="card bg-base-100 shadow-md border border-base-200"
            >
              <figure className="px-4 pt-4">
                <img
                  src={asset.productImage}
                  alt={asset.productName}
                  className="rounded-xl h-32 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-[#1E5631]">
                  {asset.productName}
                </h3>
                <p className="text-sm text-gray-500">
                  Type: {asset.productType}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Company: {asset.companyName}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Available:{' '}
                  {asset.availableQuantity ?? asset.productQuantity ?? 0}
                </p>
                <button
                  className="btn btn-sm text-white"
                  style={{ backgroundColor: '#28A745' }}
                  disabled={
                    (asset.availableQuantity ?? asset.productQuantity ?? 0) <= 0
                  }
                  onClick={() => openModal(asset)}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Modal */}
      <dialog id="request-modal" className="modal">
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>

          {selectedAsset && (
            <>
              <h3 className="font-bold text-lg mb-2">
                Request: {selectedAsset.productName}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Company: {selectedAsset.companyName}
              </p>

              <form onSubmit={handleRequestSubmit} className="space-y-3">
                <label className="label">
                  <span className="label-text">Note (optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                ></textarea>

                {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}

                <button
                  type="submit"
                  className="btn w-full text-white"
                  style={{ backgroundColor: '#1E5631' }}
                >
                  Submit Request
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
