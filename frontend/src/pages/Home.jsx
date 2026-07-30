import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
        <h1 className="mb-3 text-3xl font-bold">Task Management App</h1>

        <p className="mb-8 text-gray-600">
          Manage your daily tasks efficiently.
        </p>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full rounded border border-blue-600 py-3 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="block w-full rounded border border-blue-600 py-3 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
