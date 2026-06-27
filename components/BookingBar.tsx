"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function BookingBar() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [room, setRoom] = useState("");
  const [guests, setGuests] = useState("");

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    
    setMinDate(today);
    setCheckin(today);
    setCheckout(tomorrow);
  }, []);

  const handleCheckinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckin = e.target.value;
    setCheckin(newCheckin);
    
    if (checkout && checkout <= newCheckin) {
      const nextDay = new Date(new Date(newCheckin).getTime() + 86400000).toISOString().split("T")[0];
      setCheckout(nextDay);
    }
  };

  const bookingUrl = `/book?checkin=${checkin}&checkout=${checkout}&room=${room}&guests=${guests}`;

  return (
    <div className="bg-cream border-y border-gray-light py-8" aria-label="Quick Booking">
      <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
        <ScrollReveal className="text-center mb-8">
          <span className="label-text block mb-4">Reserve Your Stay</span>
          <div className="section-divider center"></div>
          <h2 className="text-[1.8rem] font-heading text-primary">Check Availability</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row items-stretch bg-white border border-gray-light shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
            <div className="flex-1 p-[20px_28px] border-b md:border-b-0 md:border-r border-gray-light">
              <label htmlFor="checkin-date" className="block font-label text-[0.58rem] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                Check-In
              </label>
              <input
                type="date"
                id="checkin-date"
                value={checkin}
                min={minDate}
                onChange={handleCheckinChange}
                className="w-full border-none outline-none font-body text-[0.9rem] text-primary bg-transparent p-0"
              />
            </div>
            
            <div className="flex-1 p-[20px_28px] border-b md:border-b-0 md:border-r border-gray-light">
              <label htmlFor="checkout-date" className="block font-label text-[0.58rem] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                Check-Out
              </label>
              <input
                type="date"
                id="checkout-date"
                value={checkout}
                min={checkin || minDate}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full border-none outline-none font-body text-[0.9rem] text-primary bg-transparent p-0"
              />
            </div>

            <div className="flex-1 p-[20px_28px] border-b md:border-b-0 md:border-r border-gray-light">
              <label htmlFor="room-type-select" className="block font-label text-[0.58rem] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                Room Type
              </label>
              <select
                id="room-type-select"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full border-none outline-none font-body text-[0.9rem] text-primary bg-transparent p-0"
              >
                <option value="">Any Room</option>
                <option value="standard">Standard Double</option>
                <option value="family">Family Room</option>
              </select>
            </div>

            <div className="flex-1 p-[20px_28px] border-b md:border-b-0 md:border-r border-gray-light">
              <label htmlFor="guests-count" className="block font-label text-[0.58rem] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                Guests
              </label>
              <input
                type="number"
                id="guests-count"
                min="1"
                max="10"
                placeholder="2"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border-none outline-none font-body text-[0.9rem] text-primary bg-transparent p-0"
              />
            </div>

            <Link href={bookingUrl} className="btn btn-gold m-4 whitespace-nowrap self-center justify-center">
              <span>Check Availability</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
