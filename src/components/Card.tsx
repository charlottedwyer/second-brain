export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={'p-4 rounded-2xl shadow-sm bg-white border border-purple-50 ' + className}>
      {children}
    </div>
  );
}
