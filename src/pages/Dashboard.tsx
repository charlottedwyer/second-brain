import Card from "../components/Card";
import { Link } from "react-router-dom";
import WikiList from '../components/WikiList';

export default function Dashboard() {
  return (
    <div className="p-6 font-serif text-black bg-white min-h-screen">
      <WikiList />

      <h2 className="text-3xl font-bold mt-6 mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold text-lg">Track Today</h3>
          <p className="mt-2 text-sm">Quick access to your daily tracker.</p>
          <Link to="/tracker" className="mt-3 inline-block text-sm underline">Open tracker →</Link>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">Journal</h3>
          <p className="mt-2 text-sm">Write a brief note for today.</p>
          <Link to="/journal" className="mt-3 inline-block text-sm underline">Open journal →</Link>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">Tasks</h3>
          <p className="mt-2 text-sm">View and manage your tasks.</p>
          <Link to="/tasks" className="mt-3 inline-block text-sm underline">Open tasks →</Link>
        </Card>
      </div>
    </div>
  );
}
