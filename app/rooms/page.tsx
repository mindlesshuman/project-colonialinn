import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BookingBar from "@/components/BookingBar";
import ScrollReveal from "@/components/ScrollReveal";
import RoomGallery from "@/components/RoomGallery";

export const metadata: Metadata = {
  title: "Rooms & Rates — Colonial Inn Cebu",
  description: "Explore Colonial Inn's room types — Standard Double and Family Room. Air-conditioned, Wi-Fi included, centrally located in Downtown Cebu City.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero eyebrow="Colonial Inn" title="Rooms &amp; Rates" />
      <BookingBar />

      {/* STANDARD DOUBLE ROOM */}
      <section id="standard" className="py-[100px]" aria-labelledby="standard-room-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] items-center">
            <ScrollReveal className="relative overflow-hidden h-[300px] md:h-[500px] group">
              <Image
                src="/images/single-room-gallery.jpg"
                alt="Standard Double Room — queen bed, private bath, air conditioning"
                fill
                className="object-cover transition-transform duration-800 ease-out group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-accent text-primary font-label text-[0.58rem] font-bold tracking-[0.2em] uppercase py-1.5 px-3.5 z-10">
                Most Popular
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="room-info">
              <span className="label-text block">Room Type 01</span>
              <div className="section-divider"></div>
              <h2 id="standard-room-title" className="text-primary text-[2.5rem] font-heading">Standard Double Room</h2>
              
              <div className="flex items-baseline gap-2 my-6 py-5 border-y border-gray-light" aria-label="Price: 800 Philippine Pesos per night">
                <div className="font-heading text-[3rem] text-primary leading-none">₱800</div>
                <div className="flex flex-col">
                  <span className="font-label text-[0.65rem] font-bold text-gray uppercase tracking-[0.1em]">Philippine Peso</span>
                  <span className="font-label text-[0.6rem] text-gray tracking-[0.1em]">Per Night</span>
                </div>
              </div>
              
              <p className="text-gray text-[0.9rem] leading-[1.9] mb-5">
                Our Standard Double Room offers a private, comfortable retreat in the heart of Cebu City. Ideal for solo travelers and couples, it comes fully equipped with a queen bed, private ensuite bathroom, and all the essentials for a restful stay.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 mb-8" role="list">
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-wifi text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Free High-Speed Wi-Fi</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-snowflake text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Air Conditioning</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-bath text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Private Bathroom</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-bed text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> 1 Queen Bed</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-broom text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Daily Housekeeping</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-ban-smoking text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Non-Smoking</div>
              </div>
              
              <div className="flex gap-3.5 flex-wrap">
                <Link href="/book?room=standard" className="btn btn-gold inline-flex"><span>Book This Room</span></Link>
                <Link href="/book" className="btn btn-outline inline-flex"><span>Inquire</span></Link>
              </div>

              <RoomGallery 
                images={[
                  { src: "/images/single-room-gallery.jpg", alt: "Standard Double Room interior view" }
                ]} 
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAMILY ROOM */}
      <section id="family" className="py-[100px] bg-cream" aria-labelledby="family-room-title">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] items-center">
            {/* For reverse layout on desktop, use order classes */}
            <ScrollReveal className="relative overflow-hidden h-[300px] md:h-[500px] group md:order-2">
              <Image
                src="/images/family-room-gallery.jpg"
                alt="Family Room — double bed, bunk beds, and air conditioning"
                fill
                className="object-cover transition-transform duration-800 ease-out group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-accent text-primary font-label text-[0.58rem] font-bold tracking-[0.2em] uppercase py-1.5 px-3.5 z-10">
                Family Friendly
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="room-info md:order-1">
              <span className="label-text block">Room Type 02</span>
              <div className="section-divider"></div>
              <h2 id="family-room-title" className="text-primary text-[2.5rem] font-heading">Family Room</h2>
              
              <div className="flex items-baseline gap-2 my-6 py-5 border-y border-gray-light" aria-label="Price: 1200 Philippine Pesos per night">
                <div className="font-heading text-[3rem] text-primary leading-none">₱1,200</div>
                <div className="flex flex-col">
                  <span className="font-label text-[0.65rem] font-bold text-gray uppercase tracking-[0.1em]">Philippine Peso</span>
                  <span className="font-label text-[0.6rem] text-gray tracking-[0.1em]">Per Night</span>
                </div>
              </div>
              
              <p className="text-gray text-[0.9rem] leading-[1.9] mb-5">
                Designed for families and groups, the Family Room features a comfortable full bed alongside bunk beds — perfect for parents with children or a small group of friends exploring Cebu together. Air-conditioned and Wi-Fi equipped.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 mb-8" role="list">
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-wifi text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Free High-Speed Wi-Fi</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-snowflake text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Air Conditioning</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-bed text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> 1 Full Bed + Bunk Beds</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-users text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Sleeps up to 4</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-broom text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Daily Housekeeping</div>
                <div className="flex items-center gap-2.5 text-[0.85rem] text-gray" role="listitem"><i className="fa-solid fa-ban-smoking text-accent w-4 text-[0.9rem]" aria-hidden="true"></i> Non-Smoking</div>
              </div>
              
              <div className="flex gap-3.5 flex-wrap">
                <Link href="/book?room=family" className="btn btn-gold inline-flex"><span>Book This Room</span></Link>
                <Link href="/book" className="btn btn-outline inline-flex"><span>Inquire</span></Link>
              </div>

              <RoomGallery 
                images={[
                  { src: "/images/family-room-gallery.jpg", alt: "Family Room interior view" }
                ]} 
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* POLICIES STRIP */}
      <section className="py-[60px] bg-primary text-center" aria-label="Booking Policies">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <ScrollReveal>
            <span className="label-text block mb-4 text-accent">Booking Info</span>
            <div className="section-divider center"></div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px] mt-10">
            <ScrollReveal>
              <p className="font-label text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-white/40 mb-1.5">Check-In</p>
              <p className="text-white text-[1.5rem] font-heading">2:00 PM</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-label text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-white/40 mb-1.5">Check-Out</p>
              <p className="text-white text-[1.5rem] font-heading">12:00 PM</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-label text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-white/40 mb-1.5">Payment</p>
              <p className="text-white text-[1.5rem] font-heading">Cash</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-label text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-white/40 mb-1.5">Parking</p>
              <p className="text-white text-[1.5rem] font-heading">Not Available</p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
