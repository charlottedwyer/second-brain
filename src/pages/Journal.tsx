import { useState } from "react";

type JournalEntry = {
  id: number;
  date: string;
  title?: string;
  content: string;
  tags?: string[];
  promptUsed?: string;
};

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    content: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [search, setSearch] = useState("");

  const addEntry = () => {
    if (!newEntry.content || !newEntry.date) return;
    setEntries([
      ...entries,
      { id: Date.now(), ...newEntry } as JournalEntry,
    ]);
    setNewEntry({ content: "", date: new Date().toISOString().slice(0, 10) });
  };

  const filteredEntries = entries.filter(
    e =>
      e.content.toLowerCase().includes(search.toLowerCase()) ||
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 font-serif text-black bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-2">Journal System</h2>
      <p className="mb-4 text-sm">
        Freeform text entries with rich text editing. Guided entries with prompts, search, tagging, and date-based organisation.
      </p>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search entries..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Add new entry */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Add New Entry</h3>
        <input
          type="date"
          value={newEntry.date || ""}
          onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Optional title"
          value={newEntry.title || ""}
          onChange={e => setNewEntry({ ...newEntry, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Write your entry..."
          value={newEntry.content || ""}
          onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
          className="border p-2 rounded w-full mb-2"
          rows={4}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newEntry.tags?.join(",") || ""}
          onChange={e =>
            setNewEntry({
              ...newEntry,
              tags: e.target.value.split(",").map(t => t.trim()),
            })
          }
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Prompt used (optional)"
          value={newEntry.promptUsed || ""}
          onChange={e => setNewEntry({ ...newEntry, promptUsed: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={addEntry}
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Add Entry
        </button>
      </div>

      {/* Journal entries */}
      <div className="space-y-4">
        {filteredEntries.map(entry => (
          <div key={entry.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-600">{entry.date}</p>
            {entry.title && <h3 className="font-semibold">{entry.title}</h3>}
            <p className="mt-1">{entry.content}</p>
            {entry.tags && entry.tags.length > 0 && (
              <p className="text-sm mt-1">Tags: {entry.tags.join(", ")}</p>
            )}
            {entry.promptUsed && (
              <p className="text-sm mt-1 italic">Prompt: {entry.promptUsed}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
