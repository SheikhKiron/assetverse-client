import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#1E5631', '#28A745'];

const Analytics = () => {
  const { appUser } = useAuth(); // backend user (HR)
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [topRequestedData, setTopRequestedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const loadAnalytics = async () => {
    try {
      if (!appUser || appUser.role !== 'hr') return;

      setLoading(true);
      setErrMsg('');

      const query = `hrEmail=${encodeURIComponent(appUser.email)}`;

      // Pie data
      const resPie = await fetch(
        `https://assetverse-server-nine.vercel.app/hr/analytics/asset-types?${query}`
      );
      const pieJson = await resPie.json();
      if (!resPie.ok) throw new Error(pieJson.msg || 'Failed to load pie data');

      // Bar data
      const resBar = await fetch(
        `https://assetverse-server-nine.vercel.app/hr/analytics/top-requested?${query}`
      );
      const barJson = await resBar.json();
      if (!resBar.ok) throw new Error(barJson.msg || 'Failed to load bar data');

      setAssetTypeData(Array.isArray(pieJson) ? pieJson : []);
      setTopRequestedData(Array.isArray(barJson) ? barJson : []);
    } catch (err) {
      console.error(err);
      setErrMsg(err.message);
      setAssetTypeData([]);
      setTopRequestedData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [appUser]);



  if (loading) return <p>Loading analytics...</p>;
  if (errMsg) return <p className="text-red-500">{errMsg}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">
        Asset Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-base-100 shadow-md p-4 rounded-md">
          <h3 className="font-semibold mb-2">
            Returnable vs Non-returnable Assets
          </h3>
          {assetTypeData.length === 0 ? (
            <p className="text-sm text-gray-500">No asset data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={assetTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                >
                  {assetTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 shadow-md p-4 rounded-md">
          <h3 className="font-semibold mb-2">
            Top 5 Most Requested Assets
          </h3>
          {topRequestedData.length === 0 ? (
            <p className="text-sm text-gray-500">
              No request data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topRequestedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assetName" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#28A745" name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;