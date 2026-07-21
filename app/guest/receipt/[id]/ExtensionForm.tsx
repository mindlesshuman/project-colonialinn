'use client'

import { useState } from 'react'
import { extendStay } from '@/app/actions/guest-actions'

export default function ExtensionForm({ reservationId, ratePerHour }: { reservationId: string, ratePerHour: number }) {
  const [hours, setHours] = useState('1')
  const [isExtending, setIsExtending] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleExtend = async () => {
    setIsExtending(true)
    setSuccessMsg('')
    const res = await extendStay(reservationId, parseInt(hours))
    
    if (res.success) {
      setSuccessMsg(`Successfully added ${hours} hour(s) to your stay!`)
      setTimeout(() => setSuccessMsg(''), 5000)
    } else {
      alert(res.error || 'Failed to extend stay.')
    }
    setIsExtending(false)
  }

  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
      <h3 className="font-bold text-orange-800 mb-2">Need more time?</h3>
      <p className="text-orange-600 text-sm mb-4">You can easily extend your stay right here. The extension rate is <strong>₱{ratePerHour}/hour</strong>.</p>
      
      <div className="flex gap-3">
        <select 
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="bg-white border border-orange-200 rounded-xl px-4 py-2 font-medium text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
        >
          <option value="1">+1 Hour (₱{ratePerHour * 1})</option>
          <option value="2">+2 Hours (₱{ratePerHour * 2})</option>
          <option value="3">+3 Hours (₱{ratePerHour * 3})</option>
          <option value="4">+4 Hours (₱{ratePerHour * 4})</option>
        </select>
        
        <button 
          onClick={handleExtend}
          disabled={isExtending}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-colors disabled:opacity-70"
        >
          {isExtending ? 'Updating...' : 'Extend Stay'}
        </button>
      </div>

      {successMsg && (
        <div className="mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-bold text-center animate-in zoom-in">
          {successMsg}
        </div>
      )}
    </div>
  )
}
