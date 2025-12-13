import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

const AssetList = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://assetverse-server-nine.vercel.app/hr/assets'
      );
      const data = await res.json();
      setAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    loadAssets();
  }, [user]);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    try {
      await fetch(`https://assetverse-server-nine.vercel.app/hr/assets/${id}`, {
        method: 'DELETE',
      });
      setAssets(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = assets.filter(a =>
    a.productName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading assets...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">Asset List</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-[#1E5631] text-white">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(asset => (
                <tr key={asset._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={asset.productImage} alt={asset.productName} />
                      </div>
                    </div>
                  </td>
                  <td>{asset.productName}</td>
                  <td>{asset.productType}</td>
                  <td>{asset.productQuantity}</td>
                  <td>{asset.availableQuantity}</td>
                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/edit-asset/${asset._id}`}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => handleDelete(asset._id)}
                    >
                      Delete
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

export default AssetList;
