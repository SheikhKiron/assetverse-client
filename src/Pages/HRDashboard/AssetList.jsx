import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const AssetList = () => {
  const { appUser } = useAuth();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const loadAssets = async (pageNumber = 1) => {
    try {
      if (!appUser || appUser.role !== 'hr') return;

      setLoading(true);
      setError('');

      const query = new URLSearchParams({
        page: pageNumber,
        limit,
        hrEmail: appUser.email,
      }).toString();

      const res = await fetch(
        `https://assetverse-server-nine.vercel.app/hr/assets?${query}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to fetch assets');
      }

      setAssets(data.data || []);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets(1);
  }, [appUser]);

  const changePage = newPage => {
    if (newPage < 1 || newPage > totalPages) return;
    loadAssets(newPage);
  };

  if (!appUser || appUser.role !== 'hr') {
    return <p className="text-center">Please login as HR</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">Asset List</h2>

      {assets.length === 0 ? (
        <p>No assets found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-[#1E5631] text-white">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Available</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset._id}>
                    <td>
                      <img
                        src={asset.productImage}
                        alt=""
                        className="w-12 h-12 rounded"
                      />
                    </td>
                    <td>{asset.productName}</td>
                    <td>{asset.productType}</td>
                    <td>{asset.productQuantity}</td>
                    <td>{asset.availableQuantity}</td>
                    <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map(p => (
              <button
                key={p}
                className={`btn btn-sm ${page === p + 1 ? 'btn-primary' : ''}`}
                onClick={() => changePage(p + 1)}
              >
                {p + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetList;
