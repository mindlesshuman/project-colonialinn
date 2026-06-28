'use client';

import { useTransition } from 'react';
import { updateReservationStatus, deleteReservation } from '@/app/actions/admin';

interface ReservationActionsProps {
  id: string;
  status: string;
  role?: 'admin' | 'manager';
}

export default function ReservationActions({ id, status, role = 'admin' }: ReservationActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      await updateReservationStatus(id, newStatus);
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this reservation?')) {
      startTransition(async () => {
        await deleteReservation(id);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-3">
      {status === 'pending' && (
        <div className="flex gap-2">
          <button 
            onClick={() => handleStatusChange('confirmed')}
            disabled={isPending}
            className="bg-[#27ae60] text-white text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
            title="Mark Room as Available & Send Email"
          >
            <i className="fa-solid fa-check"></i> Available
          </button>
          <button 
            onClick={() => handleStatusChange('cancelled')}
            disabled={isPending}
            className="bg-[#c0392b] text-white text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
            title="Mark Room as Unavailable"
          >
            <i className="fa-solid fa-xmark"></i> Unavailable
          </button>
        </div>
      )}
      
      {status !== 'pending' && (
        <div className="flex gap-2">
          <button 
            onClick={() => handleStatusChange('pending')}
            disabled={isPending}
            className="bg-gray text-white text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
            title="Mark as Pending"
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          {role === 'manager' && (
            <button 
              onClick={handleDelete}
              disabled={isPending}
              className="bg-primary text-white text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
              title="Delete Permanently"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
