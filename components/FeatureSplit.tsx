import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface FeatureSplitProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  reverse?: boolean;
}

export default function FeatureSplit({ imageSrc, imageAlt, eyebrow, title, children, reverse = false }: FeatureSplitProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] group">
      <div className={`relative overflow-hidden ${reverse ? "lg:order-2" : ""} h-[400px] lg:h-auto`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-800 ease-out group-hover:scale-105"
        />
      </div>
      <div className={`bg-cream flex flex-col justify-center p-10 md:p-[80px_70px] ${reverse ? "lg:order-1" : ""}`}>
        <ScrollReveal>
          <span className="label-text block mb-4">{eyebrow}</span>
          <div className="section-divider"></div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-heading text-primary mb-[60px]">{title}</h2>
        </ScrollReveal>
        {children}
      </div>
    </div>
  );
}
