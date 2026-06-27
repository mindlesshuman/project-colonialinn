import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-footer-bg text-white/60" role="contentinfo">
      <div className="pt-[80px] pb-[60px] border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-[40px] lg:gap-[60px]">
            <div className="footer-brand">
              <span className="font-heading text-[2rem] text-white tracking-[0.08em] block mb-1">
                Colonial Inn
              </span>
              <span className="font-label text-[0.55rem] tracking-[0.35em] uppercase text-accent block mb-5">
                Cebu City, Philippines
              </span>
              <p className="text-[0.82rem] leading-[1.8] max-w-[260px] mb-6">
                Your gateway to historic Cebu. Located at the intersection of Colon &amp; Borromeo Streets.
              </p>
              <div className="flex gap-3 mt-2" aria-label="Social Media Links">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-[38px] h-[38px] border border-white/10 flex items-center justify-center text-[0.85rem] text-white/45 transition-all duration-[0.35s] hover:border-accent hover:text-accent hover:bg-accent/10"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-[38px] h-[38px] border border-white/10 flex items-center justify-center text-[0.85rem] text-white/45 transition-all duration-[0.35s] hover:border-accent hover:text-accent hover:bg-accent/10"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  className="w-[38px] h-[38px] border border-white/10 flex items-center justify-center text-[0.85rem] text-white/45 transition-all duration-[0.35s] hover:border-accent hover:text-accent hover:bg-accent/10"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
                <a
                  href="mailto:colonialinn@cebu.ph"
                  aria-label="Email"
                  className="w-[38px] h-[38px] border border-white/10 flex items-center justify-center text-[0.85rem] text-white/45 transition-all duration-[0.35s] hover:border-accent hover:text-accent hover:bg-accent/10"
                >
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h5 className="font-label text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white mb-5 pb-2.5 border-b border-white/5">
                Navigate
              </h5>
              <div className="flex flex-col gap-2.5">
                <Link href="/" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Home</Link>
                <Link href="/rooms" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Rooms &amp; Rates</Link>
                <Link href="/amenities" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Amenities</Link>
                <Link href="/book" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Book Now</Link>
                <Link href="/about" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">About Us</Link>
              </div>
            </div>

            <div className="footer-col">
              <h5 className="font-label text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white mb-5 pb-2.5 border-b border-white/5">
                Rooms
              </h5>
              <div className="flex flex-col gap-2.5">
                <Link href="/rooms#standard" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Standard Double</Link>
                <Link href="/rooms#family" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Family Room</Link>
                <Link href="/book" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">Check Availability</Link>
              </div>
            </div>

            <div className="footer-col">
              <h5 className="font-label text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white mb-5 pb-2.5 border-b border-white/5">
                Contact
              </h5>
              <div className="flex flex-col gap-2.5">
                <a href="https://maps.google.com/?q=10.2952907,123.8959444" target="_blank" rel="noopener noreferrer" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">
                  217 Colon St. &amp; Borromeo St.<br />Cebu City 6000, PH
                </a>
                <a href="tel:+63322536006" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">+63 32 253 6006</a>
                <a href="mailto:colonialinn@cebu.ph" className="text-[0.82rem] text-white/50 transition-colors duration-[0.35s] hover:text-accent block">colonialinn@cebu.ph</a>
                <p className="text-white/30 text-[0.8rem] mt-3">
                  Check-in: 2:00 PM<br />Check-out: 12:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="max-w-[1300px] mx-auto px-6 md:px-[40px] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-label text-[0.6rem] tracking-[0.1em] text-white/25">
            &copy; {new Date().getFullYear()} Colonial Inn. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about#policies" className="font-label text-[0.6rem] tracking-[0.1em] text-white/25 transition-colors duration-[0.35s] hover:text-accent">Privacy Policy</Link>
            <Link href="/about#policies" className="font-label text-[0.6rem] tracking-[0.1em] text-white/25 transition-colors duration-[0.35s] hover:text-accent">Terms of Use</Link>
            <Link href="/about#policies" className="font-label text-[0.6rem] tracking-[0.1em] text-white/25 transition-colors duration-[0.35s] hover:text-accent">House Rules</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
