import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-white p-10 rounded-3xl shadow-2xl space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-indigo-700">
            Task Manager 🧠
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Stay organized, productive, and focused with your personal task
            dashboard.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "🔐 Secure Login",
              desc: "Access your own tasks with protected JWT-based login.",
            },
            {
              title: "📋 Task Management",
              desc: "Add, update, and delete your tasks easily.",
            },
            {
              title: "📊 Dashboard",
              desc: "View all your tasks and completion status in one place.",
            },
            {
              title: "🚀 Super Fast",
              desc: "Built with modern tools like React, Tailwind, and Spring Boot.",
            },
            {
              title: "📱 Mobile Friendly",
              desc: "Use it anywhere, on mobile, tablet, or desktop.",
            },
            {
              title: "🎯 Focus Mode",
              desc: "Simple, clean UI to help you focus only on tasks.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                {card.title}
              </h2>
              <p className="text-gray-600 mt-2">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition mr-4"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-block bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center pt-6 border-t">
          💻 Built using React • Spring Boot • MySQL • Tailwind CSS • JWT Auth
        </p>
      </div>
    </div>
  );
}
