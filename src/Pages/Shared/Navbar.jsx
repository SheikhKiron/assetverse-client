import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, appUser, logout, loading } = useAuth();

  const handleLogout = () => {
    logout().then(() => {
    toast.success('Logout successfully');
    });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/register-employee">Join as Employee</NavLink>
          </li>
          <li>
            <NavLink to="/register-hr">Join as HR Manager</NavLink>
          </li>
        </>
      )}
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* hamburger */}
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
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          AssetVerse
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {!user && !loading && (
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        )}

        {user && appUser && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user"
                  className='border-2 border-green-400'
                  src={
                    appUser.profileImage || 'https://i.ibb.co/6WZ5jJQ/user.png'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
            >
              {/* Employee dropdown */}
              {appUser.role === 'employee' && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-assets">My Assets</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/request-asset">
                      Request Asset
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-team">My Team</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
                </>
              )}

              {/* HR dropdown */}
              {appUser.role === 'hr' && (
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
                    <NavLink to="/dashboard/employees">Employee List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
                </>
              )}

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
