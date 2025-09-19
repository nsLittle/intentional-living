export default function SectionCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/70 shadow-sm ring-1 ring-black/5 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
