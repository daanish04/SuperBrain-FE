import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">
        Welcome to SuperBrain
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        SuperBrain is your knowledge repository. Store, share, and access your
        insights anytime, anywhere.
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
