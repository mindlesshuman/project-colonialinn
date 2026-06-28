'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { appendToGoogleSheet } from '@/lib/googleSheets';
import { sendInquiryReceivedEmail } from '@/lib/email';

export async function submitReservation(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get('firstname') as string,
      lastName: formData.get('lastname') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      checkInDate: formData.get('checkin') as string,
      checkInTime: formData.get('checkinTime') as string,
      checkOutDate: formData.get('checkout') as string,
      checkOutTime: formData.get('checkoutTime') as string,
      roomType: formData.get('room') as string,
      guests: parseInt(formData.get('guests') as string, 10),
      message: formData.get('message') as string,
    };

    // 1. Save to Database
    const reservation = await prisma.reservation.create({
      data: rawData,
    });

    // 2. Send automated inquiry received email
    // We must await this in a serverless environment so it actually sends before returning
    await sendInquiryReceivedEmail({
      ...rawData,
      to: rawData.email,
    });

    // 3. Push to Google Sheets (Digital Logbook)
    // We run this without awaiting so it doesn't block the user response,
    // or we await it to ensure it completes. Let's await it.
    await appendToGoogleSheet(rawData);

    revalidatePath('/admin');
    
    return { success: true, message: 'Reservation sent successfully.' };
  } catch (error) {
    console.error('Failed to submit reservation:', error);
    return { success: false, error: 'Failed to submit reservation. Please try again.' };
  }
}
