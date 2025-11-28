import { useState } from "react";

type TrackerEntry = {
  id: number;
  timestamp: string;
  type: string;
  details: string;
};

export default function Tracker() {
  const [entries, setEntries] = useState<TrackerEntry[]>([]);
  const [newEntry, setNewEntry] = useState<{ type: string; details: string }>({ type: "Medication", details: "" });

  const addEntry = () => {
    if (!newEntry.details) return;
    setEntries([...entries, { id: Date.now(), timestamp: new Date().toLocaleString(), ...newEntry }]);
    setNewEntry({ type: "Medication", details: "" });
  };

  return (
    <div className="p-6 font-serif text-black bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-2">Customizable Daily Trackers</h2>
      <p className="mb-6 text-sm">Track your medication, meals, dental hygiene, showers, and mood.</p>

      {/* Add new tracker entry */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Add Entry</h3>
        <select
          value={newEntry.type}
          onChange={e => setNewEntry({ ...newEntry, type: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="Medication">Medication</option>
          <option value="Meal">Meal</option>
          <option value="Dental">Dental Hygiene</option>
          <option value="Shower">Shower</option>
          <option value="Mood">Mood</option>
        </select>
        <input
          type="text"
          placeholder="Details (dosage, meal, duration, mood, etc.)"
          value={newEntry.details}
          onChange={e => setNewEntry({ ...newEntry, details: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={addEntry} className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300">
          Add Entry
        </button>
      </div>

      {/* Entries list */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold">{entry.type}</h4>
              <span className="text-xs text-gray-600">{entry.timestamp}</span>
            </div>
            <p>{entry.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
