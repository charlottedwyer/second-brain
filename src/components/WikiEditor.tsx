import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "./Button";

type WikiPage = {
  id?: string;
  title: string;
  content: string;
};

type WikiEditorProps = {
  page?: WikiPage;
  onSave: () => void;
  onDelete?: () => void;
};

export default function WikiEditor({ page, onSave, onDelete }: WikiEditorProps) {
  const [title, setTitle] = useState(page?.title || "");
  const [content, setContent] = useState(page?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !content) return;

    setLoading(true);

    let error;
    if (page?.id) {
      const { error: updateError } = await supabase
        .from("wiki")
        .update({ title, content, updated_at: new Date() })
        .eq("id", page.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("wiki")
        .insert([{ title, content }]);
      error = insertError;
    }

    setLoading(false);

    if (error) {
      alert("Error saving page: " + error.message);
      return;
    }

    onSave();
  };

  const handleDelete = async () => {
    if (!page?.id) return;

    const confirmed = confirm("Are you sure you want to delete this page?");
    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase
      .from("wiki")
      .delete()
      .eq("id", page.id);

    setLoading(false);

    if (error) {
      alert("Error deleting page: " + error.message);
      return;
    }

    if (onDelete) onDelete();
  };

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
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        {page?.id && (
          <Button onClick={handleDelete} disabled={loading} className="bg-red-600 text-white">
            {loading ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>
    </div>
  );
}
