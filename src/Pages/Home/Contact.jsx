import React from 'react';

const Contact = () => {
  return (
    <section className="mb-10 bg-base-200 rounded-xl p-6 text-center">
      <h2 className="text-2xl font-bold mb-3 text-[#1E5631]">
        Ready to streamline your asset management?
      </h2>
      <p className="text-gray-600 mb-4">
        Contact us today and see how AssetVerse can save time and money for your
        HR team.
      </p>
      <a href="/login" className="btn btn-primary">
        Get Started
      </a>
    </section>
  );
};

export default Contact;