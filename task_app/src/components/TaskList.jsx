import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function TaskList() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks", err));
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Your Tasks</h2>
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded">
            <div className="font-bold">{task.title}</div>
            <div>{task.description}</div>
            <div>Status: {task.completed ? "✅ Completed" : "🕒 Pending"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
