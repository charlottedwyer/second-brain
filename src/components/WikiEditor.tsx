import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "./Button";

type WikiEditorProps = {
  onCreate: () => void;
};

export default function WikiEditor({ onCreate }: WikiEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleCreate() {
    if (!title || !content) return;
    await supabase.from('wiki').insert([{ title, content }]);
    setTitle("");
    setContent("");
    onCreate();
  }

  return (
    <div className="my-4 p-4 border rounded-lg bg-surface">
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button onClick={handleCreate}>Create Page</Button>
    </div>
  );
}
