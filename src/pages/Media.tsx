import { useState } from "react";

type MediaItem = {
  id: number;
  type: "Book" | "Film" | "Show" | "Music" | "Musical";
  title: string;
  progress?: string;
  rating?: number;
  review?: string;
  recommendedBy?: string;
};

export default function Media() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<MediaItem["type"] | "All">("All");
  const [newItem, setNewItem] = useState<Partial<MediaItem>>({ type: "Book" });

  const addMedia = () => {
    if (!newItem.title || !newItem.type) return;
    setMediaList([
      ...mediaList,
      { id: Date.now(), ...newItem } as MediaItem,
    ]);
    setNewItem({ type: "Book" });
  };

  const updateMedia = (id: number, key: keyof MediaItem, value: any) => {
    setMediaList(mediaList.map(item => item.id === id ? { ...item, [key]: value } : item));
  };

  const filteredList = filter === "All" ? mediaList : mediaList.filter(item => item.type === filter);

  return (
    <div className="p-6">
      <h2 className=" font-bold mb-2">Media Library</h2>
      <p className="mb-6 ">
        Catalog your films, shows, books, music, and musicals. Track progress, rate, review, and note recommendations.
      </p>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by type:</label>
        <select value={filter} onChange={e => setFilter(e.target.value as any)} className="border rounded p-1">
          <option value="All">All</option>
          <option value="Book">Book</option>
          <option value="Film">Film</option>
          <option value="Show">Show</option>
          <option value="Music">Music</option>
          <option value="Musical">Musical</option>
        </select>
      </div>

      {/* Add new media */}
      <div className="mb-6 p-4 border rounded-lg ">
        <h3 className="font-semibold mb-2">Add New Media</h3>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title || ""}
          onChange={e => setNewItem({ ...newItem, title: e.target.value })}
          className="border p-1 rounded mr-2"
        />
        <select
          value={newItem.type}
          onChange={e => setNewItem({ ...newItem, type: e.target.value as any })}
          className="border p-1 rounded mr-2"
        >
          <option value="Book">Book</option>
          <option value="Film">Film</option>
          <option value="Show">Show</option>
          <option value="Music">Music</option>
          <option value="Musical">Musical</option>
        </select>
        <button onClick={addMedia} className="px-3 py-1   rounded">Add</button>
      </div>

      {/* Media list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map(item => (
          <div key={item.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold ">{item.title}</h3>
            <p className=" ">{item.type}</p>

            {/* Editable fields */}
            <input
              type="text"
              placeholder="Progress"
              value={item.progress || ""}
              onChange={e => updateMedia(item.id, "progress", e.target.value)}
              className="border p-1 rounded w-full mt-1"
            />
            <input
              type="number"
              min={1} max={5}
              placeholder="Rating"
              value={item.rating || ""}
              onChange={e => updateMedia(item.id, "rating", Number(e.target.value))}
              className="border p-1 rounded w-full mt-1"
            />
            <input
              type="text"
              placeholder="Review"
              value={item.review || ""}
              onChange={e => updateMedia(item.id, "review", e.target.value)}
              className="border p-1 rounded w-full mt-1"
            />
            <input
              type="text"
              placeholder="Recommended by"
              value={item.recommendedBy || ""}
              onChange={e => updateMedia(item.id, "recommendedBy", e.target.value)}
              className="border p-1 rounded w-full mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
