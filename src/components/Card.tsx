export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={'p-4 rounded-2xl shadow-sm  border border-forest ' + className}>
      {children}
    </div>
  );
}
