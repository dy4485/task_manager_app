import { useState, useEffect } from 'react';

export default function TaskForm({ task, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (task) setFormData(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', completed: false });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">{task ? '✏️ Edit Task' : '➕ Add Task'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full border px-3 py-2 rounded"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full border px-3 py-2 rounded"
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />
        <span>Mark as completed</span>
      </label>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
