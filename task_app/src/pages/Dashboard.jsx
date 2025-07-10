import { useEffect, useState } from 'react';
import API from '../api/api';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


const handleSubmit = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (editTask) {
      await API.put(`/tasks/${editTask.id}`, data, config);
      setEditTask(null);
    } else {
      await API.post("/tasks", data, config);
    }

    fetchTasks();
  } catch (error) {
    console.error("Error saving task:", error);
    alert("You are not authorized or an error occurred while saving the task.");
  }
};


  const handleDelete = async (id) => {
  try {
    await API.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTasks(tasks.filter((task) => task.id !== id));
  } catch (err) {
    console.error("Error deleting task:", err);
    alert("You are not authorized to delete this task.");
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="mb-8 p-6 bg-indigo-100 rounded shadow">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">Welcome to Your Task Dashboard 🗂️</h2>
        <p className="text-gray-700">
          Here you can <strong>create</strong>, <strong>update</strong>, and <strong>delete</strong> your tasks.
          All tasks are linked to your account and only visible to you.
        </p>
        <p className="mt-2 text-sm text-indigo-700">
          Use the form below to add a new task. Tasks appear right under it. Click “Edit” or “Delete” anytime.
        </p>
      </div>

      <TaskForm task={editTask} onSubmit={handleSubmit} />

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Your Tasks</h3>
        {tasks.length === 0 ? (
          <div className="text-center text-gray-600 bg-gray-100 p-6 rounded shadow">
            <p>No tasks found. Start by creating your first task above!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow mb-4 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{task.title}</h4>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {task.completed ? '✅ Completed' : '🕒 Pending'}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditTask(task)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
