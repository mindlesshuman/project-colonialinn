import ScrollReveal from "./ScrollReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  bgImage?: string;
  dark?: boolean;
}

export default function PageHero({ eyebrow, title, bgImage, dark = false }: PageHeroProps) {
  if (bgImage) {
    return (
      <div className="relative h-[60vh] min-h-[380px] flex items-center justify-center text-center overflow-hidden pt-[90px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-[#1C1410]/65"></div>
        <div className="relative z-10 px-10">
          <ScrollReveal>
            <span className="label-text block mb-4 text-accent">{eyebrow}</span>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] text-white font-heading">{title}</h1>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-[130px] pb-[60px] text-center min-h-[280px] flex items-center justify-center ${dark ? "bg-primary" : "bg-primary"}`}>
      <div>
        <ScrollReveal>
          <span className="label-text block mb-4 text-accent">{eyebrow}</span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] text-white font-heading">{title}</h1>
        </ScrollReveal>
      </div>
    </div>
  );
}
