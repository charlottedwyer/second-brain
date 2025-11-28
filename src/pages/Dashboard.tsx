import Card from "../components/Card";
import { Link } from "react-router-dom";

import WikiList from '../components/WikiList';

export default function Dashboard() {
  return (
    <>
      <WikiList />
      <div className="space-y-6">
        <h2 className=" font-semibold">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <h3 className="font-semibold">Track today</h3>
            <p className="mt-2  ">Quick access to your daily tracker.</p>
            <Link to="/tracker" className="mt-3 inline-block  ">Open tracker →</Link>
          </Card>

          <Card>
            <h3 className="font-semibold">Journal</h3>
            <p className="mt-2  ">Write a brief note for today.</p>
            <Link to="/journal" className="mt-3 inline-block  ">Open journal →</Link>
          </Card>

          <Card>
            <h3 className="font-semibold">Tasks</h3>
            <p className="mt-2  ">View and manage your tasks.</p>
            <Link to="/tasks" className="mt-3 inline-block  ">Open tasks →</Link>
          </Card>
        </div>
      </div>
    </>
  );
}
