import React from 'react';
import { Link } from 'react-router';

const Register = () => {

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <form>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" className="input" placeholder="Name" />
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <label className="label">Photo</label>
                <input
                  type="file"
                  className="file-input"
                  placeholder="Photo"
                />
               
                <button className="btn btn-primary mt-4">Register</button>
              </fieldset>
            </form>
            <p>
              Already have an account ? Please{' '}
              <Link to="/login" className="text-blue-700 underline">
               Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;