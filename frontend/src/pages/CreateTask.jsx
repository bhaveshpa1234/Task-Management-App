import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

function CreateTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    time: "",
    description: "",
    isImportant: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-lg p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create Task</h1>

          <Link
            to="/dashboard"
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Back
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block">Task Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter task name"
                className="w-full rounded border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block">Date & Time</label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block">Description</label>

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full rounded border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isImportant"
                checked={formData.isImportant}
                onChange={handleChange}
              />

              <label htmlFor="important">Important</label>
            </div>

            <button className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
