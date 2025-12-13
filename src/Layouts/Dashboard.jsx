// src/Layouts/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
import Spinner from '../Components/Spinner';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    const loadData = async () => {
      try {
        const res = await fetch(
          `https://assetverse-server-nine.vercel.app/users/by-email/${user.email}`
        );
        const data = await res.json();

        setUserData(data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setDbLoading(false);
      }
    };

    loadData();
  }, [user, loading]);

  if (loading || dbLoading) return <Spinner></Spinner>;


  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Drawer toggle checkbox */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ===== Main Content Area ===== */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="dashboard-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <div className="flex-1 px-4">
            <span className="font-bold text-xl">AssetVerse Dashboard</span>
          </div>

          <div className="px-4 text-sm">
            <span className="font-semibold">{userData.name}</span>{' '}
            <span className="badge badge-outline ml-2 uppercase">
              {userData.role}
            </span>
          </div>
        </nav>
    

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ===== Sidebar / Drawer ===== */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="w-64 bg-base-200 min-h-full flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">AssetVerse</h2>
            <p className="text-xs text-gray-500 mt-1">
              {userData.role === 'hr' ? 'HR Manager Panel' : 'Employee Panel'}
            </p>
          </div>

          {/* Sidebar menu */}
          <ul className="menu p-4 flex-1 gap-1">
            {/* Common link */}
            <li>
              <NavLink to="/" className="flex items-center gap-2">
                <span>Home</span>
              </NavLink>
            </li>

            {/* HR MENU */}
            {userData.role === 'hr' && (
              <>
                <li>
                  <NavLink to="/dashboard/assets">Asset List</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-asset">Add Asset</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/requests">All Requests</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/employees">My Employee List</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/upgrade">Upgrade Package</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
              </>
            )}

            {/* EMPLOYEE MENU */}
            {userData.role === 'employee' && (
              <>
                <li>
                  <NavLink to="/dashboard/my-assets">My Assets</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/request-asset">Request Asset</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-team">My Team</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
