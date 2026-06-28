'use server';

import prisma from '@/lib/prisma';
import { sendConfirmationEmail } from '@/lib/email';

export async function confirmReservationFromCustomer(id: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return { success: false, error: 'Reservation not found' };
    }

    if (reservation.status === 'confirmed') {
      return { success: true, message: 'Already confirmed' };
    }

    if (reservation.status !== 'available') {
      return { success: false, error: 'Reservation cannot be confirmed at this time.' };
    }

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status: 'confirmed' },
    });

    // Send the final confirmation email
    await sendConfirmationEmail({
      to: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      checkInDate: updated.checkInDate,
      checkInTime: updated.checkInTime,
      checkOutDate: updated.checkOutDate,
      checkOutTime: updated.checkOutTime,
      roomType: updated.roomType,
      guests: updated.guests,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to confirm reservation:', error);
    return { success: false, error: 'Failed to confirm reservation' };
  }
}
