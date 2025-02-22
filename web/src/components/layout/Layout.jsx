import { Link, Outlet } from 'react-router';
import './Layout.css'; // Add styles for layout

export default function Layout() {
  return (
    <div className="app-container">
      {/* Side Panel */}
      <aside className="sidebar">
        <h2>Task Manager</h2>
        <nav>
          <Link to="/">Tasks</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/add-task">Add Task</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
