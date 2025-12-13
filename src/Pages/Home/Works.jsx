import React from 'react';

const Works = () => {
  const steps = [
    {
      title: '1. HR & Employees Join',
      desc: 'HR registers the company, employees sign up individually.',
    },
    {
      title: '2. Assets Added & Requested',
      desc: 'HR adds assets to inventory, employees request what they need.',
    },
    {
      title: '3. Approve & Track',
      desc: 'HR approves requests, assignments are tracked and can be returned.',
    },
  ];
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-4">
        How AssetVerse Works
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body">
              <h3 className="card-title text-[#1E5631]">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;