import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface RoomCardProps {
  id: string;
  image: string;
  label: string;
  title: string;
  desc: string;
  amenities: string[];
  price: string;
  delay?: number;
}

export default function RoomCard({ id, image, label, title, desc, amenities, price, delay = 0 }: RoomCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <div className="room-card relative overflow-hidden bg-black cursor-pointer group">
        <div className="relative w-full h-[400px] md:h-[520px]">
          <Image
            src={image}
            alt={title}
            fill
            className="room-card-img object-cover opacity-90 transition-all duration-800 ease-out group-hover:scale-105 group-hover:opacity-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/95 via-[#1C1410]/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-0 transition-transform duration-[0.35s]">
          <span className="font-label text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-accent mb-2 block">
            {label}
          </span>
          <h3 className="font-heading text-[1.9rem] text-white leading-[1.1] mb-3">
            {title}
          </h3>
          <div className="room-card-desc max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-[80px] group-hover:opacity-100">
            <p className="font-body text-[0.85rem] text-white/70 mb-5">
              {desc}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {amenities.map((amenity, i) => (
              <span key={i} className="font-label text-[0.58rem] tracking-[0.12em] uppercase text-white/55 bg-white/10 border border-white/15 py-1 px-2.5">
                {amenity}
              </span>
            ))}
          </div>
          
          <div className="flex items-baseline gap-1.5 mb-5">
            <span className="font-heading text-[2rem] text-accent">{price}</span>
            <span className="font-label text-[0.6rem] tracking-[0.15em] uppercase text-white/50">/ night</span>
          </div>
          
          <Link href={`/rooms#${id}`} className="btn btn-outline-white">
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
