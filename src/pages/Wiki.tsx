import { useState } from "react";

type WikiEntry = {
  id: number;
  title: string;
  content: string;
  category?: string;
};

export default function Wiki() {
  const [entries, setEntries] = useState<WikiEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Partial<WikiEntry>>({});
  const [search, setSearch] = useState("");

  const addEntry = () => {
    if (!newEntry.title || !newEntry.content) return;
    setEntries([...entries, { id: Date.now(), ...newEntry } as WikiEntry]);
    setNewEntry({});
  };

  const filteredEntries = entries.filter(
    e =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.content.toLowerCase().includes(search.toLowerCase()) ||
      (e.category?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div className="p-6 font-serif text-black bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-2">Personal Wiki</h2>
      <p className="mb-6 text-sm">
        Personal information repository. Create wiki pages, link entries, and search or categorize your notes.
      </p>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search wiki..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Add new entry */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Add New Wiki Entry</h3>
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title || ""}
          onChange={e => setNewEntry({ ...newEntry, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={newEntry.category || ""}
          onChange={e => setNewEntry({ ...newEntry, category: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Content"
          value={newEntry.content || ""}
          onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
          className="border p-2 rounded w-full mb-2"
          rows={4}
        />
        <button
          onClick={addEntry}
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Create Entry
        </button>
      </div>

      {/* Wiki entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map(entry => (
          <div key={entry.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold">{entry.title}</h3>
            {entry.category && <p className="text-sm mb-1 font-medium">Category: {entry.category}</p>}
            <p className="text-sm">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
