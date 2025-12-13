import React from 'react';

const Hero = () => {
  return (
    <section className="hero min-h-[60vh] bg-base-200 rounded-xl mb-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JkeyS8qlZAV7f1vAx_lY8h1mNqz_kyxc_g&s"
          alt="Asset management"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E5631]">
            Smart Asset Management for Modern Teams
          </h1>
          <p className="py-4 text-gray-600">
            AssetVerse helps HR and Employees track, assign, and manage all
            company assets in one powerful dashboard. No more lost laptops or
            missing chairs.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/register-hr" className="btn btn-primary">
              Join as HR Manager
            </a>
            <a href="/register-employee" className="btn btn-outline">
              Join as Employee
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;