export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-block px-3 py-2 rounded-lg bg-accent text-textPrimary text-sm font-medium hover:bg-accentLight focus:outline-none"
    >
      {children}
    </button>
  );
}
