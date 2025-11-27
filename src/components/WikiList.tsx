type WikiPage = {
  id: string;
  title: string;
  content: string;
};

export default function WikiList({ pages }: { pages: WikiPage[] }) {
  return (
    <div className="mt-4">
      {pages.length === 0 && <p>No pages yet.</p>}
      {pages.map(page => (
        <div key={page.id} className="p-3 my-2 border rounded bg-surface">
          <h3 className="font-semibold">{page.title}</h3>
          <p>{page.content}</p>
        </div>
      ))}
    </div>
  );
}
