import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import WikiEditor from "./WikiEditor";

type WikiPage = {
  id: string;
  title: string;
  content: string;
};

export default function WikiManager() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [editingPage, setEditingPage] = useState<WikiPage | null>(null);

  async function fetchPages() {
    const { data, error } = await supabase.from("wiki").select("*");
    if (error) {
      alert(error.message);
      return;
    }
    setPages(data);
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div>
      <h2>Wiki Pages</h2>
      {pages.map((page) => (
        <div
          key={page.id}
          className="border p-2 my-2 cursor-pointer"
          onClick={() => setEditingPage(page)}
        >
          <h3>{page.title}</h3>
          <p>{page.content.substring(0, 100)}...</p>
        </div>
      ))}

      {editingPage && (
        <WikiEditor
          page={editingPage}
          onSave={() => {
            fetchPages();
            setEditingPage(null);
          }}
        />
      )}
    </div>
  );
}
