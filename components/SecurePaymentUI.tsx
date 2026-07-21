'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type PaymentMethod = 'card' | 'gcash' | 'maya' | 'gotyme' | 'maribank' | 'paypal'

interface SecurePaymentUIProps {
  price: number;
  onValidationChange: (isValid: boolean) => void;
}

export default function SecurePaymentUI({ price, onValidationChange }: SecurePaymentUIProps) {
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' })

  // Validate fields to ensure it can't be bypassed at the UI level
  useEffect(() => {
    if (price <= 0) {
      onValidationChange(false)
      return
    }

    if (method !== 'card') {
      // Redirect methods (GCash, Maya, etc) are handled externally by their secure portals.
      // So UI validation is automatically true.
      onValidationChange(true)
      return
    }

    // Card validation
    const isNumValid = cardData.number.replace(/\s/g, '').length >= 15
    const isExpValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardData.expiry)
    const isCvcValid = cardData.cvc.length >= 3
    const isNameValid = cardData.name.trim().length > 2

    onValidationChange(isNumValid && isExpValid && isCvcValid && isNameValid)
  }, [method, cardData, price, onValidationChange])

  if (price <= 0) return null

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-8 mb-6 shadow-sm">
      <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <h3 className="font-heading text-slate-800 text-lg">Secure Payment Information</h3>
        <span className="ml-auto text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200 whitespace-nowrap">
          256-bit SSL
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <button type="button" onClick={() => setMethod('card')} className={`flex items-center justify-center gap-2 py-3 px-2 rounded-lg border-2 transition-all ${method === 'card' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
            <i className="fa-regular fa-credit-card text-lg"></i>
            <span className="font-bold text-xs text-slate-700">Card</span>
          </button>
          
          <button type="button" onClick={() => setMethod('gcash')} className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border-2 transition-all ${method === 'gcash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
             <Image src="/payments/Gcash%20Logo.png" alt="GCash" width={60} height={20} className="object-contain h-6" />
          </button>
          
          <button type="button" onClick={() => setMethod('maya')} className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border-2 transition-all ${method === 'maya' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
             <Image src="/payments/Maya%20Logo.png" alt="Maya" width={60} height={20} className="object-contain h-6" />
          </button>
          
          <button type="button" onClick={() => setMethod('gotyme')} className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border-2 transition-all ${method === 'gotyme' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
             <Image src="/payments/gotyme-bank-seeklogo.png" alt="GoTyme Bank" width={60} height={20} className="object-contain h-6" />
          </button>

          <button type="button" onClick={() => setMethod('maribank')} className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border-2 transition-all ${method === 'maribank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
             <Image src="/payments/maribank-seeklogo.png" alt="MariBank" width={60} height={20} className="object-contain h-6" />
          </button>

          <button type="button" onClick={() => setMethod('paypal')} className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg border-2 transition-all ${method === 'paypal' ? 'border-blue-800 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
             <Image src="/payments/Paypal%20Logo.png" alt="PayPal" width={60} height={20} className="object-contain h-6" />
          </button>
        </div>

        {method === 'card' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  maxLength={19}
                  value={cardData.number}
                  onChange={e => setCardData({...cardData, number: e.target.value})}
                  placeholder="0000 0000 0000 0000" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono" 
                />
                <i className="fa-brands fa-cc-visa absolute left-3 top-3.5 text-slate-400 text-lg"></i>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiration Date</label>
                <input 
                  type="text" 
                  maxLength={5}
                  value={cardData.expiry}
                  onChange={e => setCardData({...cardData, expiry: e.target.value})}
                  placeholder="MM/YY" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CVC / CVV</label>
                <div className="relative">
                  <input 
                    type="text" 
                    maxLength={4}
                    value={cardData.cvc}
                    onChange={e => setCardData({...cardData, cvc: e.target.value})}
                    placeholder="123" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono" 
                  />
                  <i className="fa-regular fa-circle-question absolute right-3 top-3.5 text-slate-400 cursor-help"></i>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cardholder Name</label>
              <input 
                type="text" 
                value={cardData.name}
                onChange={e => setCardData({...cardData, name: e.target.value})}
                placeholder="Name on Card" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent" 
              />
            </div>
          </div>
        )}

        {method === 'gcash' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
            <div className="mb-4 bg-white p-3 rounded-full shadow-sm border border-gray-100">
               <Image src="/payments/Gcash%20Logo.png" alt="GCash" width={100} height={30} className="object-contain h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Pay securely via GCash</h4>
            <p className="text-slate-500 text-sm max-w-sm">
              Upon submission, you will be safely redirected to the GCash environment to authorize this transaction.
            </p>
          </div>
        )}

        {method === 'maya' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
            <div className="mb-4 bg-white p-3 rounded-full shadow-sm border border-gray-100">
               <Image src="/payments/Maya%20Logo.png" alt="Maya" width={100} height={30} className="object-contain h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Pay securely via Maya</h4>
            <p className="text-slate-500 text-sm max-w-sm">
              Upon submission, you will be safely redirected to the Maya application to complete the payment.
            </p>
          </div>
        )}

        {method === 'gotyme' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
            <div className="mb-4 bg-white p-3 rounded-full shadow-sm border border-gray-100">
               <Image src="/payments/gotyme-bank-seeklogo.png" alt="GoTyme" width={100} height={30} className="object-contain h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Pay via GoTyme Bank</h4>
            <p className="text-slate-500 text-sm max-w-sm">
              You will be redirected to the secure GoTyme payment portal.
            </p>
          </div>
        )}

        {method === 'maribank' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
            <div className="mb-4 bg-white p-3 rounded-full shadow-sm border border-gray-100">
               <Image src="/payments/maribank-seeklogo.png" alt="MariBank" width={100} height={30} className="object-contain h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Pay via MariBank</h4>
            <p className="text-slate-500 text-sm max-w-sm">
              You will be redirected to the secure MariBank payment gateway.
            </p>
          </div>
        )}

        {method === 'paypal' && (
          <div className="py-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
            <div className="mb-4 bg-white p-3 rounded-full shadow-sm border border-gray-100">
               <Image src="/payments/Paypal%20Logo.png" alt="PayPal" width={100} height={30} className="object-contain h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Checkout with PayPal</h4>
            <p className="text-slate-500 text-sm max-w-sm">
              Securely check out using your PayPal balance or linked cards.
            </p>
          </div>
        )}

      </div>
      
      <div className="bg-slate-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm font-medium">
          <i className="fa-solid fa-shield-halved text-emerald-600"></i>
          <span>Industry Standard End-to-End Encryption</span>
        </div>
        <div className="hidden sm:flex gap-2">
          <i className="fa-brands fa-cc-visa text-2xl text-slate-300"></i>
          <i className="fa-brands fa-cc-mastercard text-2xl text-slate-300"></i>
        </div>
      </div>
    </div>
  )
}
