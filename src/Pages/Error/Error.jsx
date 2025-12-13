import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center p-6">
        <h1
          className="text-8xl font-extrabold mb-4"
          style={{ color: '#1E5631' }}
        >
          404
        </h1>

        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>

        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn text-white border-none"
          style={{ backgroundColor: '#28A745' }}
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
