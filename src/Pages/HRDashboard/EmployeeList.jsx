// src/Pages/HRDashboard/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const EmployeeList = () => {
  const { appUser } = useAuth(); // backend user (HR info)
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const loadEmployees = async () => {
    try {
      if (!appUser || appUser.role !== 'hr') return;

      setLoading(true);
      setErrMsg('');

      const res = await fetch(
        `https://assetverse-server-nine.vercel.app/hr/employees?hrEmail=${appUser.email}`
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          text || `Failed to load employees. Status: ${res.status}`
        );
      }

      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrMsg(err.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [appUser]);

  if (!appUser || appUser.role !== 'hr') {
    return <p>Please login as HR to see employee list.</p>;
  }

  if (loading) return <p>Loading employees...</p>;
  if (errMsg) return <p className="text-red-500">{errMsg}</p>;

  if (!employees.length) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2 text-[#1E5631]">
          My Employee List
        </h2>
        <p>No asset-approved employees found for your company yet.</p>
      </div>
    );
  }

  const used = employees.length;
  const limit = appUser.packageLimit || 5;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-[#1E5631]">
        My Employee List
      </h2>
      <p className="mb-4">
        Employees used:{' '}
        <span className="font-semibold text-[#28A745]">
          {used}/{limit}
        </span>
      </p>

      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra">
          <thead className="bg-[#1E5631] text-white">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          emp.profileImage || 'https://via.placeholder.com/80'
                        }
                        alt={emp.name}
                      />
                    </div>
                  </div>
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  {emp.createdAt
                    ? new Date(emp.createdAt).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
