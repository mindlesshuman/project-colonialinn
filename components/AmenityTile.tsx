interface AmenityTileProps {
  icon: string;
  title: string;
  desc: string;
}

export default function AmenityTile({ icon, title, desc }: AmenityTileProps) {
  return (
    <div className="bg-off-white p-10 md:p-[50px_40px] text-center transition-all duration-[0.35s] hover:bg-cream hover:-translate-y-1">
      <span className="text-[2rem] mb-4 block text-accent drop-shadow-[0_2px_4px_rgba(201,168,76,0.3)]">
        {icon}
      </span>
      <h4 className="font-label text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary mb-2">
        {title}
      </h4>
      <p className="text-[0.83rem] text-gray leading-[1.6]">
        {desc}
      </p>
    </div>
  );
}
