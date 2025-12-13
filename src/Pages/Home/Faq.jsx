import React from 'react';

const Faq = () => {
    const faqs = [
      {
        q: 'Is AssetVerse free to start?',
        a: 'Yes, HR Managers start with a Basic package that supports 5 employees.',
      },
      {
        q: 'Can employees work with multiple companies?',
        a: 'Yes, employees can have multiple affiliations through different requests.',
      },
      {
        q: 'Do you support Stripe payments?',
        a: 'Yes, HR can upgrade packages securely using Stripe.',
      },
      {
        q: 'Is my data secure?',
        a: 'We use JWT-based auth and role-based permissions to protect your data.',
      },
    ];

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-center text-[#1E5631] mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 max-w-3xl mx-auto">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="collapse collapse-arrow bg-base-100 border border-base-200"
          >
            <input type="checkbox" />
            <div className="collapse-title text-md font-semibold">{item.q}</div>
            <div className="collapse-content">
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;