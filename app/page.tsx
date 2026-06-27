import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import FeatureSplit from "@/components/FeatureSplit";
import RoomCard from "@/components/RoomCard";
import AmenityTile from "@/components/AmenityTile";
import BookingBar from "@/components/BookingBar";
import LocationSection from "@/components/LocationSection";
import FullbleedCta from "@/components/FullbleedCta";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <StatsStrip />

      {/* ABOUT TEASER */}
      <section className="py-[60px] md:py-[100px] bg-cream">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <FeatureSplit
            imageSrc="/images/lobby.png"
            imageAlt="Colonial Inn lobby with warm colonial decor"
            eyebrow="Our Story"
            title="Where History Meets Comfort"
          >
            <ScrollReveal delay={0.1}>
              <p className="text-gray text-[0.92rem] leading-[1.9] mb-6">
                Colonial Inn sits at the crossroads of Cebu&apos;s most storied streets — Colon, the oldest street in the Philippines, and Borromeo Street. We offer a warm, affordable retreat that keeps you connected to everything that makes Cebu unforgettable.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray text-[0.92rem] leading-[1.9] mb-9">
                With free Wi-Fi, air-conditioned rooms, 24-hour reception, and daily housekeeping, every detail is crafted for your comfort — without compromise.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link href="/about" className="btn btn-outline inline-flex">
                <span>Learn More About Us</span>
              </Link>
            </ScrollReveal>
          </FeatureSplit>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="bg-charcoal" aria-labelledby="rooms-heading">
        <div className="pt-[80px] pb-[50px] px-6 md:px-[80px]">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="label-text block mb-4">Accommodation</span>
            <div className="section-divider center"></div>
            <h2 id="rooms-heading" className="text-white text-[clamp(2rem,4vw,3rem)] font-heading">
              Our Rooms &amp; Suites
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          <RoomCard
            id="standard"
            image="/images/room-standard.png"
            label="Most Popular"
            title="Standard Double Room"
            desc="A private, air-conditioned retreat with a queen bed, private ensuite bathroom, and all the comforts of home."
            amenities={["Air Conditioning", "Free Wi-Fi", "Private Bath"]}
            price="₱800"
            delay={0}
          />
          <RoomCard
            id="family"
            image="/images/room-family.png"
            label="Family Friendly"
            title="Family Room"
            desc="Perfect for families — features a full bed and bunk beds, air conditioning, and shared or private bathroom options."
            amenities={["Air Conditioning", "Free Wi-Fi", "Bunk Beds"]}
            price="₱1,200"
            delay={0.2}
          />
        </div>

        <div className="text-center pt-[50px] pb-[80px] px-10">
          <Link href="/rooms" className="btn btn-gold inline-flex">
            <span>Browse All Rooms</span>
          </Link>
        </div>
      </section>

      {/* AMENITIES TEASER */}
      <section className="py-[60px] md:py-[100px] bg-cream" aria-labelledby="amenities-heading">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <ScrollReveal className="text-center mb-[60px]">
            <span className="label-text block mb-4">Facilities &amp; Services</span>
            <div className="section-divider center"></div>
            <h2 id="amenities-heading" className="text-primary text-[clamp(2rem,4vw,3.2rem)] font-heading">
              Everything You Need
            </h2>
            <p className="text-gray max-w-[500px] mx-auto mt-4 text-[0.9rem] leading-[1.8]">
              Simple, essential comforts — crafted to make your stay in Cebu effortless and enjoyable.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gray-light">
              <AmenityTile icon="📶" title="Free Wi-Fi" desc="Complimentary high-speed wireless internet throughout the property." />
              <AmenityTile icon="❄️" title="Air Conditioning" desc="All rooms are fully air-conditioned for your comfort in Cebu's tropical climate." />
              <AmenityTile icon="🕐" title="24-Hour Reception" desc="Our front desk team is available round the clock for check-in and assistance." />
              <AmenityTile icon="🛎️" title="Daily Housekeeping" desc="Fresh linens and a clean room every day — no extra charge." />
              <AmenityTile icon="🚭" title="Non-Smoking Rooms" desc="All guest rooms are designated non-smoking for a healthier environment." />
              <AmenityTile icon="📍" title="Prime Location" desc="On the oldest street in the Philippines — minutes to every major Cebu landmark." />
            </div>
          </ScrollReveal>

          <div className="text-center mt-[50px]">
            <ScrollReveal>
              <Link href="/amenities" className="btn btn-outline inline-flex">
                <span>View All Amenities</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* QUICK BOOKING BAR */}
      <BookingBar />

      {/* LOCATION SECTION */}
      <LocationSection />

      {/* FULLBLEED CTA */}
      <FullbleedCta
        imageSrc="/images/cebu.png"
        eyebrow="Start Your Journey"
        title={<>Ready to Experience<br /><em>Historic Cebu?</em></>}
        desc="Book your stay at Colonial Inn today and put yourself at the center of everything Cebu has to offer."
        primaryBtnText="Book Your Room"
        primaryBtnHref="/book"
        secondaryBtnText="Call Us Now"
        secondaryBtnHref="tel:+63322536006"
      />
    </>
  );
}
