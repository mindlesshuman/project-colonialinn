import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface FullbleedCtaProps {
  imageSrc: string;
  eyebrow: string;
  title: React.ReactNode;
  desc: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
}

export default function FullbleedCta({
  imageSrc,
  eyebrow,
  title,
  desc,
  primaryBtnText,
  primaryBtnHref,
  secondaryBtnText,
  secondaryBtnHref,
}: FullbleedCtaProps) {
  return (
    <div className="relative min-h-[500px] flex items-center overflow-hidden" aria-label="Call to Action">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      ></div>
      <div className="absolute inset-0 bg-[#1C1410]/65"></div>
      
      <div className="relative z-10 text-center py-20 px-10 max-w-[1300px] mx-auto w-full">
        <ScrollReveal className="mb-4">
          <span className="label-text block">{eyebrow}</span>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="text-[clamp(2rem,5vw,4rem)] text-white font-heading mb-4 leading-tight">
            {title}
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-white/70 max-w-[550px] mx-auto mb-9 text-[0.95rem]">
            {desc}
          </p>
        </ScrollReveal>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <ScrollReveal delay={0.3}>
            <Link href={primaryBtnHref} className="btn btn-gold inline-flex">
              <span>{primaryBtnText}</span>
            </Link>
          </ScrollReveal>
          
          {secondaryBtnText && secondaryBtnHref && (
            <ScrollReveal delay={0.4}>
              <Link href={secondaryBtnHref} className="btn btn-outline-white inline-flex">
                <span>{secondaryBtnText}</span>
              </Link>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
