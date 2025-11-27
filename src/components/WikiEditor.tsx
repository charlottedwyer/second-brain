import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "./Button";

type WikiEditorProps = {
  onCreate: () => void;
};

export default function WikiEditor({ onCreate }: WikiEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!title || !content) return;

    setLoading(true);
    const { error } = await supabase
      .from("wiki")
      .insert([{ title, content }]);

    setLoading(false);

    if (error) {
      alert("Error creating page: " + error.message);
      return;
    }

    setTitle("");
    setContent("");
    onCreate(); // refresh the list
  }

  return (
    <div className="my-4 p-4 border rounded-lg bg-surface">
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Page"}
      </Button>
    </div>
  );
}
