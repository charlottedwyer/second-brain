export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-block px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 focus:outline-none"
    >
      {children}
    </button>
  );
}
