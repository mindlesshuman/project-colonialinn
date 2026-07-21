"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ScrollReveal from "./ScrollReveal";
import { submitReservation } from "@/app/actions/book";
import SecurePaymentUI from "./SecurePaymentUI";

export default function BookingForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    checkinTime: "14:00",
    checkoutTime: "12:00",
    room: "",
    duration: "", // 10 or 24
    guests: "2",
    message: "",
    price: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
    
    setFormData(prev => ({
      ...prev,
      checkin: searchParams.get("checkin") || today,
      room: searchParams.get("room") || "",
      guests: searchParams.get("guests") || "2"
    }));
  }, [searchParams]);

  // Calculate Price & Checkout based on Check-in Date, Time, Room, and Duration
  useEffect(() => {
    if (!formData.room || !formData.duration || !formData.checkin || !formData.checkinTime) {
      setFormData(prev => ({ ...prev, price: 0, checkout: "", checkoutTime: "" }));
      return;
    }

    let calculatedPrice = 0;
    const durNum = parseInt(formData.duration);

    if (formData.room === "standard") {
      if (durNum === 10) calculatedPrice = 599;
      if (durNum === 24) calculatedPrice = 1200;
    } else if (formData.room === "family") {
      if (durNum === 10) calculatedPrice = 1200;
      if (durNum === 24) calculatedPrice = 2400;
    }

    // Auto-calculate check-out date and time
    const [year, month, day] = formData.checkin.split('-').map(Number);
    const [hours, minutes] = formData.checkinTime.split(':').map(Number);
    const checkInDateObj = new Date(year, month - 1, day, hours, minutes);
    
    // Add duration hours
    checkInDateObj.setHours(checkInDateObj.getHours() + durNum);

    const outYear = checkInDateObj.getFullYear();
    const outMonth = String(checkInDateObj.getMonth() + 1).padStart(2, '0');
    const outDay = String(checkInDateObj.getDate()).padStart(2, '0');
    const outHours = String(checkInDateObj.getHours()).padStart(2, '0');
    const outMins = String(checkInDateObj.getMinutes()).padStart(2, '0');

    setFormData(prev => ({ 
      ...prev, 
      price: calculatedPrice,
      checkout: `${outYear}-${outMonth}-${outDay}`,
      checkoutTime: `${outHours}:${outMins}`
    }));

  }, [formData.room, formData.duration, formData.checkin, formData.checkinTime]);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim() && ["firstname", "lastname", "email", "checkin", "room", "duration"].includes(name)) {
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
    if (errors[name]) validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    const fieldsToValidate = ["firstname", "lastname", "email", "checkin", "room", "duration"];
    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData] as string)) isValid = false;
    });

    if (!isValid) return;

    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, submit: "" }));

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value));
      });

      const result = await submitReservation(data);

      setIsSubmitting(false);

      if (result.success) {
        setIsSuccess(true);
        setFormData(prev => ({
          ...prev, firstname: "", lastname: "", email: "", phone: "", message: "", duration: "", room: "", price: 0
        }));
      } else {
        setErrors(prev => ({ ...prev, submit: result.error || "Failed to submit." }));
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors(prev => ({ ...prev, submit: "An unexpected error occurred." }));
    }
  };

  return (
    <ScrollReveal delay={0.2} className="bg-white p-8 md:p-[50px] shadow-[0_8px_60px_rgba(0,0,0,0.07)] relative">
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-10 max-w-[500px] shadow-2xl text-center border-t-4 border-accent relative transform transition-all">
            <button onClick={() => setIsSuccess(false)} className="absolute top-4 right-4 text-gray hover:text-primary transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-paper-plane text-2xl"></i>
            </div>
            <h3 className="font-heading text-[1.8rem] text-primary mb-3">Inquiry Received!</h3>
            <p className="font-body text-gray text-[0.9rem] leading-relaxed mb-8">
              Thank you for inquiring! Please wait for our staff to check availability. We'll send a confirmation email with a link to your digital receipt shortly.
            </p>
            <button onClick={() => setIsSuccess(false)} className="btn btn-gold bg-primary text-white w-full justify-center hover:bg-charcoal">
              <span>Okay</span>
            </button>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-100 text-red-800 p-[20px_28px] mb-6 font-label text-[0.75rem] font-bold tracking-[0.1em] uppercase" role="alert">
          ✗ {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Reservation Inquiry Form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="firstname" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">First Name *</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} onBlur={handleBlur} required className={`w-full p-[14px_16px] border ${errors.firstname ? "border-[#c0392b]" : "border-gray-light"} bg-off-white outline-none focus:border-accent appearance-none`} />
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Last Name *</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} onBlur={handleBlur} required className={`w-full p-[14px_16px] border ${errors.lastname ? "border-[#c0392b]" : "border-gray-light"} bg-off-white outline-none focus:border-accent appearance-none`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="email" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required className={`w-full p-[14px_16px] border ${errors.email ? "border-[#c0392b]" : "border-gray-light"} bg-off-white outline-none focus:border-accent appearance-none`} />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-[14px_16px] border border-gray-light bg-off-white outline-none focus:border-accent appearance-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label htmlFor="form-room" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Room Type *</label>
            <select id="form-room" name="room" value={formData.room} onChange={handleChange} onBlur={handleBlur} required className={`w-full p-[14px_16px] border ${errors.room ? "border-[#c0392b]" : "border-gray-light"} bg-off-white outline-none focus:border-accent appearance-none`}>
              <option value="">Select a Room</option>
              <option value="standard">Standard Room</option>
              <option value="family">Family Room</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="form-duration" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Duration *</label>
            <select id="form-duration" name="duration" value={formData.duration} onChange={handleChange} onBlur={handleBlur} disabled={!formData.room} required className={`w-full p-[14px_16px] border ${errors.duration ? "border-[#c0392b]" : "border-gray-light"} bg-off-white outline-none focus:border-accent appearance-none disabled:opacity-50`}>
              <option value="">Select Duration</option>
              <option value="10">10 Hours</option>
              <option value="24">24 Hours</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5">
          <div className="form-group">
            <label className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Check-In Date *</label>
            <input type="date" name="checkin" value={formData.checkin} min={minDate} onChange={handleChange} onBlur={handleBlur} required className={`w-full p-[14px_16px] border ${errors.checkin ? "border-[#c0392b]" : "border-gray-light"} bg-off-white outline-none focus:border-accent appearance-none`} />
          </div>
          <div className="form-group">
            <label className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Check-In Time *</label>
            <input type="time" name="checkinTime" value={formData.checkinTime} onChange={handleChange} required className="w-full p-[14px_16px] border border-gray-light bg-off-white outline-none focus:border-accent appearance-none" />
          </div>
        </div>

        {/* Read-only checkout based on duration */}
        {formData.checkout && formData.checkoutTime && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5.5 opacity-60">
            <div className="form-group">
              <label className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Auto Check-Out Date</label>
              <input type="date" readOnly value={formData.checkout} className="w-full p-[14px_16px] border border-gray-light bg-gray-100 outline-none appearance-none cursor-not-allowed" />
            </div>
            <div className="form-group">
              <label className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Auto Check-Out Time</label>
              <input type="time" readOnly value={formData.checkoutTime} className="w-full p-[14px_16px] border border-gray-light bg-gray-100 outline-none appearance-none cursor-not-allowed" />
            </div>
          </div>
        )}

        <div className="form-group mb-5.5">
          <label className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Special Requests or Message</label>
          <textarea name="message" placeholder="Any special requests…" value={formData.message} onChange={handleChange} className="w-full p-[14px_16px] border border-gray-light bg-off-white outline-none focus:border-accent appearance-none resize-y min-h-[120px]"></textarea>
        </div>

        {formData.price > 0 && (
          <div className="bg-gray-50 border border-gray-light p-4 flex justify-between items-center mb-6">
            <span className="font-heading text-gray text-lg">Total Estimated Cost:</span>
            <span className="font-heading text-accent text-2xl font-bold">₱{formData.price}</span>
          </div>
        )}

        <SecurePaymentUI price={formData.price} onValidationChange={setIsPaymentValid} />

        <button type="submit" disabled={isSubmitting || !isPaymentValid} className="btn btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2">
          <span>{isSubmitting ? "Processing Payment…" : "Pay & Complete Reservation"}</span>
        </button>
      </form>
    </ScrollReveal>
  );
}
