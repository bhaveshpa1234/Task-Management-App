import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/tasks?page=${page}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTasks();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

      getTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Task Management</h1>

          <Link
            to="/create-task"
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            + Add Task
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded border p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Your Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="mb-4 rounded border p-4">
                <h3 className="text-xl font-semibold">{task.name}</h3>

                <p className="mt-2">{new Date(task.time).toLocaleString()}</p>

                <p className="mt-2">{task.description}</p>

                <p className="mt-2">
                  Important: {task.isImportant ? "Yes" : "No"}
                </p>

                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="flex items-center">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
