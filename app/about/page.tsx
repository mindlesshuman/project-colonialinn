import { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import PolicyCard from "@/components/PolicyCard";
import FeatureSplit from "@/components/FeatureSplit";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us & Policies — Colonial Inn Cebu",
  description: "Learn about the history of Colonial Inn and read our hotel policies, check-in times, and house rules.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="About Colonial Inn" bgImage="/images/hero.png" />

      {/* STORY SECTION */}
      <section className="py-[100px]" aria-labelledby="story-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <FeatureSplit
            imageSrc="/images/lobby.png"
            imageAlt="Colonial Inn historical lobby"
            eyebrow="Heritage"
            title="A Cebuano Legacy"
          >
            <ScrollReveal delay={0.1}>
              <p className="text-gray text-[0.92rem] leading-[1.9] mb-6">
                Established as a humble resting place for merchants and travelers in the bustling downtown area, Colonial Inn has stood witness to the rapid modernization of Cebu City while retaining its classic charm.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray text-[0.92rem] leading-[1.9] mb-6">
                Our location at the corner of Colon Street — the oldest and shortest national road in the Philippines — means you are literally sleeping amidst history. Colon Street was laid out by Miguel Lopez de Legazpi, the Spanish explorer who founded the first settlement in the Philippines in 1565.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-gray text-[0.92rem] leading-[1.9]">
                Today, we continue our tradition of genuine Cebuano hospitality: warm, practical, and welcoming to all.
              </p>
            </ScrollReveal>
          </FeatureSplit>
        </div>
      </section>

      {/* NEARBY LANDMARKS */}
      <section className="py-[100px] bg-charcoal" aria-labelledby="landmarks-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="label-text block mb-4 text-accent">Explore</span>
            <div className="section-divider center"></div>
            <h2 id="landmarks-title" className="text-white text-[clamp(2rem,4vw,3.2rem)] font-heading">Historical Landmarks</h2>
            <p className="text-white/60 max-w-[540px] mx-auto mt-4 text-[0.9rem] leading-[1.8]">
              Step outside our doors and you&apos;re minutes away from the most significant historical sites in the Philippines.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-[#241A15] p-8 h-full border border-white/5 transition-transform duration-[0.35s] hover:-translate-y-1">
                <div className="text-[2.5rem] mb-4">✝️</div>
                <h3 className="text-white font-heading text-[1.4rem] mb-2">Magellan&apos;s Cross</h3>
                <span className="font-label text-[0.6rem] tracking-[0.15em] uppercase text-accent mb-4 block">700 meters away</span>
                <p className="text-white/50 text-[0.85rem] leading-[1.7]">Planted by Portuguese and Spanish explorers as ordered by Ferdinand Magellan upon arriving in Cebu in 1521.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-[#241A15] p-8 h-full border border-white/5 transition-transform duration-[0.35s] hover:-translate-y-1">
                <div className="text-[2.5rem] mb-4">⛪</div>
                <h3 className="text-white font-heading text-[1.4rem] mb-2">Basilica del Santo Niño</h3>
                <span className="font-label text-[0.6rem] tracking-[0.15em] uppercase text-accent mb-4 block">750 meters away</span>
                <p className="text-white/50 text-[0.85rem] leading-[1.7]">The oldest Roman Catholic church in the country, built on the spot where the image of the Santo Niño was found during Legazpi&apos;s expedition.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-[#241A15] p-8 h-full border border-white/5 transition-transform duration-[0.35s] hover:-translate-y-1">
                <div className="text-[2.5rem] mb-4">🏰</div>
                <h3 className="text-white font-heading text-[1.4rem] mb-2">Fort San Pedro</h3>
                <span className="font-label text-[0.6rem] tracking-[0.15em] uppercase text-accent mb-4 block">1.3 km away</span>
                <p className="text-white/50 text-[0.85rem] leading-[1.7]">A military defense structure built by the Spanish under the command of Miguel López de Legazpi, now a peaceful museum and park.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* POLICIES SECTION */}
      <section id="policies" className="py-[100px] bg-cream" aria-labelledby="policies-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="label-text block mb-4">Good to Know</span>
            <div className="section-divider center"></div>
            <h2 id="policies-title" className="text-primary text-[clamp(2rem,4vw,3.2rem)] font-heading">Hotel Policies</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <PolicyCard icon="🕒" title="Check-in & Check-out">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Check-in:</strong> 2:00 PM onwards</li>
                  <li><strong>Check-out:</strong> strictly by 12:00 PM</li>
                  <li>Early check-in and late check-out are subject to room availability and may incur additional charges.</li>
                  <li>Valid government-issued ID required upon check-in.</li>
                </ul>
              </PolicyCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <PolicyCard icon="💳" title="Payments & Deposits">
                <ul className="list-disc pl-5 space-y-2">
                  <li>We currently accept <strong>Cash</strong> payments only at the front desk.</li>
                  <li>A fully refundable incidental deposit of ₱500 is required upon check-in.</li>
                  <li>Full payment for the entire stay is required upon check-in.</li>
                </ul>
              </PolicyCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <PolicyCard icon="👨‍👩‍👧‍👦" title="Children & Extra Beds">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Children 7 years old and below stay for free when sharing existing beds with parents.</li>
                  <li>Maximum of 1 free child per room.</li>
                  <li>Extra beds/mattresses are not available due to room space constraints.</li>
                </ul>
              </PolicyCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <PolicyCard icon="🚫" title="House Rules">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Strictly Non-Smoking:</strong> Smoking inside rooms or corridors will incur a ₱2,000 cleaning fee.</li>
                  <li><strong>Pets:</strong> Pets are not allowed on the property.</li>
                  <li><strong>Quiet Hours:</strong> Please observe quiet hours from 10:00 PM to 7:00 AM to respect other guests.</li>
                  <li><strong>Durian:</strong> Bringing durian fruit into the hotel is strictly prohibited.</li>
                </ul>
              </PolicyCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
