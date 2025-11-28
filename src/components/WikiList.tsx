import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import WikiEditor from "./WikiEditor";

type WikiPage = {
  id: string;
  title: string;
  content: string;
};

export default function WikiList() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<WikiPage | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchPages();
  }, [refresh]);

  const fetchPages = async () => {
    const { data, error } = await supabase.from("wiki").select("*").order("created_at", { ascending: false });
    if (error) {
      alert("Error fetching pages: " + error.message);
    } else {
      setPages(data || []);
    }
  };

  const handleSave = () => {
    setSelectedPage(null);
    setRefresh(!refresh);
  };

  return (
    <div>
      {selectedPage ? (
        <WikiEditor page={selectedPage} onSave={handleSave} />
      ) : (
        <>
          <button
            className="mb-4 p-2   rounded"
            onClick={() => setSelectedPage({ id: "", title: "", content: "" })}
          >
          </button>
          <ul>
            {pages.map((page) => (
              <li
                key={page.id}
                className="p-2 border-b cursor-pointer hover:"
                onClick={() => setSelectedPage(page)}
              >
                {page.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
