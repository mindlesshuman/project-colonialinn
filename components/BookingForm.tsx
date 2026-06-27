"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ScrollReveal from "./ScrollReveal";

export default function BookingForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    room: "",
    guests: "2",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Set initial dates
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    
    setMinDate(today);
    
    // Parse URL params
    const paramCheckin = searchParams.get("checkin");
    const paramCheckout = searchParams.get("checkout");
    const paramRoom = searchParams.get("room");
    const paramGuests = searchParams.get("guests");

    setFormData(prev => ({
      ...prev,
      checkin: paramCheckin || today,
      checkout: paramCheckout || tomorrow,
      room: paramRoom || "",
      guests: paramGuests || "2"
    }));
  }, [searchParams]);

  const validateField = (name: string, value: string) => {
    let error = "";
    
    if (!value.trim() && ["firstname", "lastname", "email", "checkin", "checkout", "room"].includes(name)) {
      error = "This field is required.";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email address.";
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      validateField(name, value);
    }
    
    // Auto-update checkout if checkin changes
    if (name === "checkin" && formData.checkout && formData.checkout <= value) {
      const nextDay = new Date(new Date(value).getTime() + 86400000).toISOString().split("T")[0];
      setFormData(prev => ({ ...prev, checkout: nextDay }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    const fieldsToValidate = ["firstname", "lastname", "email", "checkin", "checkout", "room"];
    
    fieldsToValidate.forEach(field => {
      const isFieldValid = validateField(field, formData[field as keyof typeof formData]);
      if (!isFieldValid) isValid = false;
    });

    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData(prev => ({
        ...prev,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: ""
      }));
      
      // Auto-hide success message after 6s
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1200);
  };

  return (
    <ScrollReveal delay={0.2} className="bg-white p-8 md:p-[50px] shadow-[0_8px_60px_rgba(0,0,0,0.07)] relative">
      {isSuccess && (
        <div className="bg-gradient-to-br from-accent to-accent-light text-primary p-[20px_28px] mb-6 font-label text-[0.75rem] font-bold tracking-[0.1em] uppercase" role="alert">
          ✓ Your reservation inquiry has been sent! We&apos;ll confirm within 2–4 hours.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Reservation Inquiry Form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="firstname" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">First Name <span className="text-[#c0392b]">*</span></label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Juan"
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="given-name"
              className={`w-full p-[14px_16px] border ${errors.firstname ? "border-[#c0392b]" : "border-gray-light"} rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none`}
            />
            {errors.firstname && <span className="block text-[0.72rem] text-[#c0392b] mt-1.5 font-label tracking-[0.05em]">{errors.firstname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Last Name <span className="text-[#c0392b]">*</span></label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="dela Cruz"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="family-name"
              className={`w-full p-[14px_16px] border ${errors.lastname ? "border-[#c0392b]" : "border-gray-light"} rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none`}
            />
            {errors.lastname && <span className="block text-[0.72rem] text-[#c0392b] mt-1.5 font-label tracking-[0.05em]">{errors.lastname}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="email" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Email Address <span className="text-[#c0392b]">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="juan@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="email"
              className={`w-full p-[14px_16px] border ${errors.email ? "border-[#c0392b]" : "border-gray-light"} rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none`}
            />
            {errors.email && <span className="block text-[0.72rem] text-[#c0392b] mt-1.5 font-label tracking-[0.05em]">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+63 912 345 6789"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              className="w-full p-[14px_16px] border border-gray-light rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="form-checkin" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Check-In Date <span className="text-[#c0392b]">*</span></label>
            <input
              type="date"
              id="form-checkin"
              name="checkin"
              value={formData.checkin}
              min={minDate}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full p-[14px_16px] border ${errors.checkin ? "border-[#c0392b]" : "border-gray-light"} rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none`}
            />
            {errors.checkin && <span className="block text-[0.72rem] text-[#c0392b] mt-1.5 font-label tracking-[0.05em]">{errors.checkin}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="form-checkout" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Check-Out Date <span className="text-[#c0392b]">*</span></label>
            <input
              type="date"
              id="form-checkout"
              name="checkout"
              value={formData.checkout}
              min={formData.checkin || minDate}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full p-[14px_16px] border ${errors.checkout ? "border-[#c0392b]" : "border-gray-light"} rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none`}
            />
            {errors.checkout && <span className="block text-[0.72rem] text-[#c0392b] mt-1.5 font-label tracking-[0.05em]">{errors.checkout}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="form-room" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Room Type <span className="text-[#c0392b]">*</span></label>
            <select
              id="form-room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full p-[14px_16px] border ${errors.room ? "border-[#c0392b]" : "border-gray-light"} rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none`}
            >
              <option value="">Select a Room</option>
              <option value="standard">Standard Double — ₱800/night</option>
              <option value="family">Family Room — ₱1,200/night</option>
            </select>
            {errors.room && <span className="block text-[0.72rem] text-[#c0392b] mt-1.5 font-label tracking-[0.05em]">{errors.room}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="form-guests" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Number of Guests</label>
            <select
              id="form-guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full p-[14px_16px] border border-gray-light rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </div>
        </div>

        <div className="form-group mb-5.5">
          <label htmlFor="message" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Special Requests or Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Any special requests, questions, or details about your stay…"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-[14px_16px] border border-gray-light rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors duration-[0.35s] focus:border-accent appearance-none resize-y min-h-[120px]"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn btn-gold w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          <span>{isSubmitting ? "Sending…" : "Send Reservation Inquiry"}</span>
        </button>
      </form>
    </ScrollReveal>
  );
}
