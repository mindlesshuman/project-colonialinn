import { Suspense } from "react";
import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Book a Room — Colonial Inn Cebu",
  description: "Send a reservation inquiry for Colonial Inn in Downtown Cebu City. Affordable rates, great location, and comfortable rooms.",
};

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Colonial Inn" title="Book Your Stay" />

      <section className="py-[100px] bg-cream relative">
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-primary"></div>
        <div className="max-w-[1100px] mx-auto px-6 md:px-[40px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-white text-[2rem] font-heading mb-5">Reservation Inquiry</h2>
                <p className="text-white/70 text-[0.9rem] leading-[1.8] mb-8">
                  Fill out the form with your travel dates and details. Our reservations team will check availability and get back to you within 2–4 hours with confirmation and payment instructions.
                </p>

                <div className="bg-[#241A15] p-6 lg:p-8 border border-white/5 shadow-2xl mt-8">
                  <h3 className="font-label text-[0.68rem] font-bold tracking-[0.2em] uppercase text-accent mb-5">
                    Direct Contact
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3 text-[0.85rem] text-white/70">
                      <i className="fa-solid fa-phone mt-1 w-4 text-accent"></i>
                      <div>
                        <a href="tel:+63322536006" className="transition-colors hover:text-white block">+63 32 253 6006</a>
                        <a href="tel:+639171234567" className="transition-colors hover:text-white block">+63 917 123 4567</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-[0.85rem] text-white/70">
                      <i className="fa-solid fa-envelope mt-1 w-4 text-accent"></i>
                      <a href="mailto:colonialinn@cebu.ph" className="transition-colors hover:text-white block">colonialinn@cebu.ph</a>
                    </div>
                    <div className="flex items-start gap-3 text-[0.85rem] text-white/70">
                      <i className="fa-brands fa-facebook-messenger mt-1 w-4 text-accent"></i>
                      <a href="#" className="transition-colors hover:text-white block">m.me/colonialinncebu</a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <Suspense fallback={<div className="p-8 text-center text-white/50">Loading booking form...</div>}>
                <BookingForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
