// src/Pages/EmployeeDashboard/MyTeam.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyTeam = () => {
  const { user } = useAuth(); // Firebase user
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!user || !user.email) return;

    setLoading(true);
    setErrMsg('');

    fetch(`http://localhost:5000/employee/my-team/${user.email}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load team data');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTeams(data);
        } else {
          setTeams([]);
        }
        setSelectedIndex(0);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setErrMsg(err.message);
        setTeams([]);
        setLoading(false);
      });
  }, [user]);

  if (!user?.email) return <p>Please login as Employee.</p>;
  if (loading) return <p>Loading team...</p>;
  if (errMsg) return <p className="text-red-500">{errMsg}</p>;

  if (!teams.length) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">My Team</h2>
        <p>
          No company affiliation found. Request assets from HR to get affiliated
          with a company and see your team here.
        </p>
      </div>
    );
  }

  const currentTeam = teams[selectedIndex];
  const colleagues = currentTeam.colleagues || [];

  const thisMonth = new Date().getMonth() + 1;
  const upcomingBirthdays = colleagues.filter(col => {
    if (!col.dateOfBirth) return false;
    const dobMonth = new Date(col.dateOfBirth).getMonth() + 1;
    return dobMonth === thisMonth;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">My Team</h2>

      {/* Company Selector */}
      <div className="mb-4">
        <label className="label">
          <span className="label-text font-semibold">Select Company</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedIndex}
          onChange={e => setSelectedIndex(Number(e.target.value))}
        >
          {teams.map((team, index) => (
            <option key={index} value={index}>
              {team.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Team Members */}
      <h3 className="text-xl font-semibold mb-2">
        Team at {currentTeam.companyName || 'Unknown Company'}
      </h3>

      {colleagues.length === 0 ? (
        <p>No colleagues found for this company.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {colleagues.map(col => (
            <div
              key={col.email}
              className="card bg-base-100 shadow-md border border-base-200"
            >
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          col.profileImage || 'https://via.placeholder.com/80'
                        }
                        alt={col.name}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{col.name}</h4>
                    <p className="text-xs text-gray-500">{col.email}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Position: {col.position || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Birthdays */}
      <h3 className="text-xl font-semibold mb-2 text-[#28A745]">
        Upcoming Birthdays (This Month)
      </h3>
      {upcomingBirthdays.length === 0 ? (
        <p>No birthdays this month.</p>
      ) : (
        <ul className="space-y-1">
          {upcomingBirthdays.map(col => (
            <li key={col.email} className="text-sm">
              {col.name}{' '}
              {col.dateOfBirth &&
                '— ' +
                  new Date(col.dateOfBirth).toLocaleDateString(undefined, {
                    day: '2-digit',
                    month: 'short',
                  })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTeam;
