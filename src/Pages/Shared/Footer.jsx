import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between gap-6">
        {/* Brand + Copy */}
        <div>
          <h3 className="text-xl font-bold text-[#1E5631]">AssetVerse</h3>
          <p className="text-sm text-gray-600">
            Corporate Asset Management System
          </p>
          <p className="mt-3 text-xs text-gray-500">
            © {year} AssetVerse. All rights reserved.
          </p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="link link-hover" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/register-employee">
                Join as Employee
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/register-hr">
                Join as HR Manager
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-600">
            Email:{' '}
            <a href="mailto:support@assetverse.com" className="link link-hover">
              support@assetverse.com
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Phone:{' '}
            <a href="tel:+15551234567" className="link link-hover">
              +1 (555) 123-4567
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4">
          
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="text-gray-600 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.146 3H21l-6.5 7.431L21.873 21H17.09l-4.13-5.453L7.919 21H5.064l6.943-7.937L3 3h4.91l3.796 5.017L18.146 3zm-2.024 15.54h1.136L7.95 4.39H6.732l9.39 14.15z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 hover:text-[#0A66C2]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 23.5h4.56V7.99H.22V23.5zM8.5 7.99h4.37v2.1h.06c.61-1.16 2.11-2.38 4.34-2.38 4.64 0 5.5 3.05 5.5 7.02v8.77h-4.56v-7.78c0-1.86-.03-4.26-2.6-4.26-2.6 0-3 2.03-3 4.13v7.91H8.5V7.99z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-gray-600 hover:text-[#1877F2]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 22v-8h3l1-4h-4V7c0-1.084.916-1 2-1h2V2h-3c-3.309 0-5 1.791-5 5v3H7v4h3v8h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
