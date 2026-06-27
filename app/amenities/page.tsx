import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AmenityTile from "@/components/AmenityTile";
import LocationSection from "@/components/LocationSection";
import PolicyCard from "@/components/PolicyCard";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Amenities & Location — Colonial Inn Cebu",
  description: "Colonial Inn amenities — Free Wi-Fi, Air Conditioning, 24-hour front desk, and more. Centrally located in Downtown Cebu City near Magellan's Cross.",
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero 
        eyebrow="Everything You Need" 
        title="Amenities &amp; Location" 
        bgImage="/images/lobby.png" 
      />

      {/* AMENITIES FULL GRID */}
      <section className="py-[100px]" aria-labelledby="amenities-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="label-text block mb-4">Facilities &amp; Services</span>
            <div className="section-divider center"></div>
            <h2 id="amenities-title" className="text-[clamp(2rem,4vw,3.2rem)] font-heading text-primary">Hotel Amenities</h2>
            <p className="text-gray max-w-[540px] mx-auto mt-4 text-[0.9rem] leading-[1.8]">
              We believe comfort shouldn&apos;t come at a premium. Every amenity at Colonial Inn is included in your stay — no hidden fees, no surprises.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gray-light">
              <AmenityTile icon="📶" title="Free Wi-Fi" desc="Complimentary high-speed wireless internet is available throughout all guest rooms and common areas." />
              <AmenityTile icon="❄️" title="Air Conditioning" desc="Every room features its own air conditioning unit — stay cool in Cebu's tropical climate year-round." />
              <AmenityTile icon="🛎️" title="24-Hour Front Desk" desc="Our friendly reception team is available around the clock for check-ins, check-outs, and any assistance you need." />
              <AmenityTile icon="🧹" title="Daily Housekeeping" desc="Fresh linens, towels, and a thoroughly cleaned room awaiting you every day — included at no extra charge." />
              <AmenityTile icon="🚭" title="Non-Smoking Rooms" desc="All guest rooms are designated non-smoking for a cleaner, healthier stay for you and fellow guests." />
              <AmenityTile icon="🗺️" title="Prime Downtown Location" desc="Steps from Cebu's most iconic landmarks, shopping, dining, and transit hubs — explore everything on foot." />
              <AmenityTile icon="🔒" title="Safe & Secure" desc="Guest security is our priority. All areas are monitored and access is controlled for your peace of mind." />
              <AmenityTile icon="🧳" title="Luggage Storage" desc="Need to store bags before check-in or after check-out? We offer complimentary luggage storage." />
              <AmenityTile icon="💁" title="Local Concierge Tips" desc="Our team knows Cebu inside and out — ask us for restaurant recommendations, directions, or transport help." />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* LOCATION SPLIT */}
      <LocationSection />

      {/* TRANSPORT OPTIONS */}
      <section className="py-[100px] bg-cream" aria-labelledby="transport-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="label-text block mb-4">Getting Around</span>
            <div className="section-divider center"></div>
            <h2 id="transport-title" className="text-[clamp(2rem,4vw,3.2rem)] font-heading text-primary">Transport Options</h2>
            <p className="text-gray max-w-[500px] mx-auto mt-4 text-[0.9rem] leading-[1.8]">
              Cebu City is highly accessible and our location puts you close to all major transit options.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[50px]">
            <ScrollReveal>
              <PolicyCard icon="🚌" title="Jeepney">
                <p>The iconic Filipino jeepney stops right outside — the cheapest way to get around Cebu City.</p>
              </PolicyCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <PolicyCard icon="🛺" title="Tricycle">
                <p>Short hops around downtown are easy by tricycle — affordable and widely available on every corner.</p>
              </PolicyCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <PolicyCard icon="🚗" title="Grab / Taxi">
                <p>Grab (ridesharing) and metered taxis are available throughout the city for comfortable travel.</p>
              </PolicyCard>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <PolicyCard icon="🚶" title="On Foot">
                <p>The best way to discover Downtown Cebu — all major landmarks are within a 15-minute walk.</p>
              </PolicyCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
