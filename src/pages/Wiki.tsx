import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import WikiList from "../components/WikiList";
import WikiEditor from "../components/WikiEditor";

type WikiPage = {
  id: string;
  title: string;
  content: string;
};

export default function Wiki() {
  const [pages, setPages] = useState<WikiPage[]>([]);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    const { data } = await supabase
      .from("wiki")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPages(data as WikiPage[]);
  }

  return (
    <div>
      <h2 className=" font-semibold">Wiki</h2>
      <p className="mt-2">Your linked notes and knowledge base.</p>
      <WikiEditor onCreate={fetchPages} />
      <WikiList pages={pages} />
    </div>
  );
}
