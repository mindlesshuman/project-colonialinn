import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function LocationSection() {
  return (
    <section aria-labelledby="location-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
        <div className="relative min-h-[350px] lg:min-h-[450px]">
          <iframe
            src="https://maps.google.com/maps?q=10.2952907,123.8959444&z=17&output=embed"
            title="Colonial Inn location on Google Maps"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-none"
          ></iframe>
        </div>
        <div className="bg-primary p-10 md:p-[70px_60px] flex flex-col justify-center">
          <ScrollReveal>
            <span className="label-text block mb-4">Getting Here</span>
            <h2 id="location-heading" className="text-white text-[2.5rem] font-heading mb-[30px]">
              Our Location
            </h2>
            <p className="text-white/65 text-[0.9rem] mb-[30px] leading-[1.8]">
              217 Colon St. &amp; Borromeo St., Cebu City 6000, Philippines. Situated at the heart of Downtown Cebu — the most historically rich urban district in the country.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-4 mb-9" role="list">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10" role="listitem">
                <span className="text-[1.1rem]">✝️</span>
                <div>
                  <span className="block font-label text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white mb-0.5">Magellan&apos;s Cross</span>
                  <span className="text-[0.78rem] text-white/45">~700m — 8 min walk</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10" role="listitem">
                <span className="text-[1.1rem]">⛪</span>
                <div>
                  <span className="block font-label text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white mb-0.5">Basilica del Santo Niño</span>
                  <span className="text-[0.78rem] text-white/45">~750m — 9 min walk</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10" role="listitem">
                <span className="text-[1.1rem]">🏰</span>
                <div>
                  <span className="block font-label text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white mb-0.5">Fort San Pedro</span>
                  <span className="text-[0.78rem] text-white/45">~1.3 km — 15 min walk</span>
                </div>
              </div>
              <div className="flex items-center gap-3" role="listitem">
                <span className="text-[1.1rem]">✈️</span>
                <div>
                  <span className="block font-label text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white mb-0.5">Mactan-Cebu International Airport</span>
                  <span className="text-[0.78rem] text-white/45">~12 km — 25 min by car</span>
                </div>
              </div>
            </div>
            
            <Link href="/amenities#location" className="btn btn-outline-white inline-flex">
              <span>Get Directions</span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
