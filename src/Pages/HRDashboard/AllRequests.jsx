import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const AllRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://assetverse-server-nine.vercel.app/hr/requests'
      );
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    loadRequests();
  }, [user]);

  const updateStatus = async (id, action) => {
    try {
      const url =
        action === 'approve'
          ? `https://assetverse-server-nine.vercel.app/hr/requests/${id}/approve`
          : `https://assetverse-server-nine.vercel.app/hr/requests/${id}/reject`;

      const res = await fetch(url, { method: 'PATCH' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to update');

      // reload
      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">All Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-[#1E5631] text-white">
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id}>
                  <td>
                    {req.requesterName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {req.requesterEmail}
                    </span>
                  </td>
                  <td>{req.assetName}</td>
                  <td>{req.assetType}</td>
                  <td>{req.companyName}</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        req.requestStatus === 'approved'
                          ? 'badge-success'
                          : req.requestStatus === 'rejected'
                          ? 'badge-error'
                          : 'badge-warning'
                      }`}
                    >
                      {req.requestStatus}
                    </span>
                  </td>
                  <td className="max-w-xs text-xs">{req.note}</td>
                  <td className="space-x-1">
                    <button
                      className="btn btn-xs btn-outline btn-success"
                      disabled={req.requestStatus !== 'pending'}
                      onClick={() => updateStatus(req._id, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      disabled={req.requestStatus !== 'pending'}
                      onClick={() => updateStatus(req._id, 'reject')}
                    >
                      Reject
                    </button>
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

export default AllRequests;
