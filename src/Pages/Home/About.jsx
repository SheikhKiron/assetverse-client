import React from 'react';

const About = () => {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-4">
        Why Choose AssetVerse?
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        AssetVerse is built for growing companies that need clear visibility and
        control over every laptop, chair, and device. We reduce admin work,
        prevent asset loss, and keep your team productive.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-[#1E5631]">Full Visibility</h3>
            <p className="text-sm text-gray-600">
              See who has which asset, when it was assigned, and its status at
              any time.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-[#1E5631]">HR Friendly</h3>
            <p className="text-sm text-gray-600">
              HR managers get a simple dashboard to approve requests, manage
              employees, and upgrade plans.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-[#1E5631]">Employee First</h3>
            <p className="text-sm text-gray-600">
              Employees can request assets, view their team, and manage their
              own assigned equipment.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-[#1E5631]">Secure & Scalable</h3>
            <p className="text-sm text-gray-600">
              Built with JWT auth, role-based access, and scalable MongoDB
              backend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;