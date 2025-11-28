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
      className={`inline-block px-3 py-2 rounded-lg  Primary  font-medium hover:Light focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`} // merged
    >
      {children}
    </button>
  );
}
