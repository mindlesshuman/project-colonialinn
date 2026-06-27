"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial check
    } else {
      setIsScrolled(true); // Always solid on non-home pages
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Amenities", href: "/amenities" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-[0.35s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isScrolled || !isHomePage
            ? "bg-[#1C1410]/95 backdrop-blur-[10px] shadow-[0_2px_30px_rgba(0,0,0,0.3)] h-[70px]"
            : "bg-transparent h-[90px]"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-[50px]">
          <Link href="/" className="flex flex-col gap-[1px]" aria-label="Colonial Inn Home">
            <span className="font-heading text-2xl font-normal text-white tracking-[0.08em] leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              Colonial Inn
            </span>
            <span className="font-label text-[0.55rem] font-medium tracking-[0.35em] text-accent uppercase">
              Cebu City, Philippines
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-[36px]" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`font-label text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-[0.35s] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-accent after:origin-left after:transition-transform after:duration-[0.35s] ${
                    pathname === link.href
                      ? "text-accent after:scale-x-100"
                      : "text-white/85 hover:text-accent after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/book"
            className="hidden md:inline-block font-label text-[0.65rem] font-semibold tracking-[0.2em] uppercase py-[10px] px-[24px] border-[1.5px] border-accent text-accent bg-transparent transition-all duration-[0.35s] hover:bg-accent hover:text-primary"
          >
            Book Now
          </Link>

          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 z-[1000]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-[0.35s] block ${isMobileMenuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}></span>
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-[0.35s] block ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-[0.35s] block ${isMobileMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[#1C1410]/98 z-[999] flex flex-col items-center justify-center gap-8 transition-opacity duration-[0.35s] ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Mobile Navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-heading text-[2rem] tracking-[0.05em] transition-colors duration-[0.35s] hover:text-accent ${
              pathname === link.href ? "text-accent" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/book"
          onClick={() => setIsMobileMenuOpen(false)}
          className="font-heading text-[2rem] tracking-[0.05em] transition-colors duration-[0.35s] text-accent hover:text-white"
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
