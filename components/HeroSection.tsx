"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Parallax effect
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`hero relative h-screen min-h-[600px] overflow-hidden flex items-end ${isLoaded ? "loaded" : ""}`} aria-label="Hero">
      <div
        className="hero-bg absolute inset-0 transition-transform duration-[8s] ease-out"
        style={{
          transform: isLoaded ? `scale(1) translateY(${scrollY * 0.3}px)` : `scale(1.06) translateY(${scrollY * 0.3}px)`,
        }}
      >
        <Image
          src="/images/hero.png"
          alt="Colonial Inn exterior"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-[#1C1410]/25 via-[#1C1410]/15 to-[#1C1410]/85"></div>

      <div className="hero-content relative z-10 px-8 md:px-[80px] pb-[90px] max-w-[900px]">
        <p className={`font-label text-[0.65rem] font-semibold tracking-[0.35em] uppercase text-accent mb-5 transition-all duration-700 ease-out delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          Welcome to Colonial Inn
        </p>
        
        <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-normal text-white leading-[1.05] mb-6 overflow-hidden" aria-label="In the Heart of Historic Cebu">
          <span className="block overflow-hidden">
            <span className={`block transition-transform duration-[0.75s] ease-[cubic-bezier(0.25,1,0.5,1)] ${isLoaded ? "translate-y-0 delay-[400ms]" : "translate-y-[110%]"}`}>
              In the Heart
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className={`block transition-transform duration-[0.75s] ease-[cubic-bezier(0.25,1,0.5,1)] ${isLoaded ? "translate-y-0 delay-[600ms]" : "translate-y-[110%]"}`}>
              of Historic
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className={`block transition-transform duration-[0.75s] ease-[cubic-bezier(0.25,1,0.5,1)] ${isLoaded ? "translate-y-0 delay-[800ms]" : "translate-y-[110%]"}`}>
              <em>Cebu.</em>
            </span>
          </span>
        </h1>

        <p className={`font-body text-[0.95rem] font-light text-white/75 max-w-[500px] mb-10 leading-[1.8] transition-all duration-700 ease-out delay-[1100ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          Nestled at the iconic intersection of Colon &amp; Borromeo Streets — steps away from centuries-old landmarks, vibrant markets, and the soul of Cebu City.
        </p>

        <div className={`flex gap-4 flex-wrap transition-all duration-700 ease-out delay-[1300ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <Link href="/book" className="btn btn-gold">
            <span>Reserve Your Stay</span>
          </Link>
          <Link href="/rooms" className="btn btn-outline-white">
            <span>Explore Rooms</span>
          </Link>
        </div>
      </div>

      <div className={`hidden md:flex absolute bottom-10 right-[80px] z-10 flex-col items-center gap-2 transition-opacity duration-700 ease-out delay-[1500ms] ${isLoaded ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
        <span className="font-label text-[0.55rem] tracking-[0.3em] text-white/50 uppercase [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-[1px] h-[50px] bg-gradient-to-b from-white/50 to-transparent animate-[scrollLine_2s_ease_infinite]">
          <style>{`
            @keyframes scrollLine {
              0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
              50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
              100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
