interface PolicyCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function PolicyCard({ icon, title, children }: PolicyCardProps) {
  return (
    <div className="bg-white p-9 border-t-[3px] border-accent shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-[0.35s] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 text-left">
      <div className="text-[1.5rem] mb-4 text-accent">{icon}</div>
      <h4 className="font-label text-[0.68rem] font-bold tracking-[0.2em] uppercase text-primary mb-3">
        {title}
      </h4>
      <div className="text-[0.85rem] text-gray leading-[1.7]">
        {children}
      </div>
    </div>
  );
}
