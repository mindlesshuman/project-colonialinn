'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendConfirmationEmail, sendUnavailableEmail, sendAvailableEmail } from '@/lib/email';
import { headers } from 'next/headers';

export async function updateReservationStatus(id: string, newStatus: string) {
  try {
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: newStatus },
    });

    if (newStatus === 'confirmed') {
      // Must await in serverless environments to ensure execution
      await sendConfirmationEmail({
        to: reservation.email,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        checkInDate: reservation.checkInDate,
        checkInTime: reservation.checkInTime,
        checkOutDate: reservation.checkOutDate,
        checkOutTime: reservation.checkOutTime,
        roomType: reservation.roomType,
        guests: reservation.guests,
      });
    } else if (newStatus === 'cancelled') {
      await sendUnavailableEmail({
        to: reservation.email,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        checkInDate: reservation.checkInDate,
        checkInTime: reservation.checkInTime,
        checkOutDate: reservation.checkOutDate,
        checkOutTime: reservation.checkOutTime,
        roomType: reservation.roomType,
        guests: reservation.guests,
      });
    } else if (newStatus === 'available') {
      const headersList = await headers();
      const host = headersList.get('host') || 'localhost:3000';
      const protocol = headersList.get('x-forwarded-proto') || 'http';
      const baseUrl = `${protocol}://${host}`;

      await sendAvailableEmail({
        to: reservation.email,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        checkInDate: reservation.checkInDate,
        checkInTime: reservation.checkInTime,
        checkOutDate: reservation.checkOutDate,
        checkOutTime: reservation.checkOutTime,
        roomType: reservation.roomType,
        guests: reservation.guests,
        id: reservation.id,
        baseUrl,
      });
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

export async function deleteReservation(id: string) {
  try {
    await prisma.reservation.delete({
      where: { id },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete reservation:', error);
    return { success: false, error: 'Failed to delete reservation' };
  }
}
