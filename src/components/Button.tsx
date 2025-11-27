export default function Button({
  children,
  onClick,
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // added
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-block px-3 py-2 rounded-lg bg-accent text-textPrimary text-sm font-medium hover:bg-accentLight focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`} // merged
    >
      {children}
    </button>
  );
}
