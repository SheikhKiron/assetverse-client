// src/Pages/EmployeeDashboard/MyAssets.jsx
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyAssets = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const printRef = useRef(null);

  const loadMyRequests = async () => {
    try {
      if (!user?.email) return;
      setLoading(true);
      setErrMsg('');

      const res = await fetch(
        `https://assetverse-server-nine.vercel.app/employee/requests/${user.email}`
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to load your assets');
      }
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrMsg(err.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyRequests();
  }, [user]);

  const filtered = requests.filter(req => {
    const matchName = req.assetName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchType =
      typeFilter === 'All' ? true : req.assetType === typeFilter;
    return matchName && matchType;
  });

  const handleReturn = async id => {
    if (!window.confirm('Are you sure you want to return this asset?')) return;

    try {
      const res = await fetch(
        `https://assetverse-server-nine.vercel.app/employee/requests/${id}/return`,
        { method: 'PATCH' }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Return failed');

      alert('Asset returned successfully!');
      loadMyRequests();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!user?.email) return <p>Please login as Employee.</p>;
  if (loading) return <p>Loading your assets...</p>;

  return (
    <div ref={printRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#1E5631]">My Assets</h2>
        <button
          className="btn btn-sm text-white"
          style={{ backgroundColor: '#1E5631' }}
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      {errMsg && <p className="text-red-500 mb-2">{errMsg}</p>}

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-[#1E5631] text-white">
              <tr>
                <th>Image</th>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(req => (
                <tr key={req._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            req.assetImage || 'https://via.placeholder.com/80'
                          }
                          alt={req.assetName}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{req.assetName}</td>
                  <td>{req.assetType}</td>
                  <td>{req.companyName}</td>
                  <td>
                    {req.requestDate
                      ? new Date(req.requestDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    {req.approvalDate
                      ? new Date(req.approvalDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        req.requestStatus === 'approved'
                          ? 'badge-success'
                          : req.requestStatus === 'rejected'
                          ? 'badge-error'
                          : req.requestStatus === 'returned'
                          ? 'badge-info'
                          : 'badge-warning'
                      }`}
                    >
                      {req.requestStatus}
                    </span>
                  </td>
                  <td>
                    {req.assetType === 'Returnable' &&
                      req.requestStatus === 'approved' && (
                        <button
                          className="btn btn-xs btn-outline btn-warning"
                          onClick={() => handleReturn(req._id)}
                        >
                          Return
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
