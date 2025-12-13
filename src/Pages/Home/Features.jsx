import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Asset Tracking',
      desc: 'Track every device, furniture, or equipment with status and history.',
    },
    {
      title: 'Request Workflow',
      desc: 'Employees request assets, HR approves, and assignment is auto-recorded.',
    },
    {
      title: 'Role-Based Access',
      desc: 'Separate dashboards for HR Managers and Employees with JWT protection.',
    },
    {
      title: 'Multi-Company Support',
      desc: 'Employees can work with multiple companies, each with its own team.',
    },
    {
      title: 'Return Management',
      desc: 'Easily mark returnable assets as returned and update stock.',
    },
    {
      title: 'Stripe Billing',
      desc: 'HR can upgrade package instantly using secure Stripe payments.',
    },
  ];

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-4">
        Powerful Features at a Glance
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body">
              <h3 className="card-title text-[#1E5631]">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ===== Testimonials / Stats Section =====
const StatsSection = () => {
  return (
    <section className="mb-10">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Stats */}
        <div className="stats shadow bg-base-100 w-full">
          <div className="stat">
            <div className="stat-title">Companies using AssetVerse</div>
            <div className="stat-value text-[#1E5631]">100+</div>
            <div className="stat-desc">Growing every month</div>
          </div>
          <div className="stat">
            <div className="stat-title">Assets Tracked</div>
            <div className="stat-value text-[#28A745]">5K+</div>
            <div className="stat-desc">Across multiple industries</div>
          </div>
          <div className="stat">
            <div className="stat-title">Average Setup Time</div>
            <div className="stat-value text-[#1E5631]">30 min</div>
            <div className="stat-desc">From signup to first asset</div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-[#1E5631]">
            Trusted by modern teams
          </h2>
          <div className="space-y-3">
            <div className="p-4 border rounded-md bg-base-100">
              <p className="text-sm italic">
                “AssetVerse finally gave us control over our hardware. Approvals
                and returns are so much easier now.”
              </p>
              <p className="mt-2 text-sm font-semibold">
                — Sarah, HR Manager at TechWave
              </p>
            </div>
            <div className="p-4 border rounded-md bg-base-100">
              <p className="text-sm italic">
                “As an employee, I can see all my assigned assets and request
                new ones without emailing HR.”
              </p>
              <p className="mt-2 text-sm font-semibold">
                — Mike, Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;