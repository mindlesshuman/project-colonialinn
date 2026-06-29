'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createWalkInSession() {
  try {
    const session = await prisma.walkInSession.create({
      data: {
        status: 'waiting',
      },
    })
    return { success: true, sessionId: session.id }
  } catch (error) {
    console.error('Failed to create walk-in session:', error)
    return { success: false, error: 'Failed to create session' }
  }
}

export async function getWalkInSession(id: string) {
  try {
    const session = await prisma.walkInSession.findUnique({
      where: { id },
    })
    return { success: true, session }
  } catch (error) {
    console.error('Failed to get walk-in session:', error)
    return { success: false, error: 'Failed to retrieve session' }
  }
}

export async function updateWalkInSession(
  id: string,
  data: { firstName: string; lastName: string; email: string; phone: string }
) {
  try {
    const session = await prisma.walkInSession.update({
      where: { id },
      data: {
        ...data,
        status: 'filled',
      },
    })
    return { success: true, session }
  } catch (error) {
    console.error('Failed to update walk-in session:', error)
    return { success: false, error: 'Failed to update session' }
  }
}

export async function completeWalkInReservation(
  sessionId: string,
  reservationData: {
    checkInDate: string
    checkInTime: string
    checkOutDate: string
    checkOutTime: string
    roomType: string
    guests: number
    message?: string
  }
) {
  try {
    // 1. Get the session to retrieve guest details
    const session = await prisma.walkInSession.findUnique({
      where: { id: sessionId },
    })

    if (!session || session.status !== 'filled') {
      return { success: false, error: 'Invalid or incomplete session.' }
    }

    // 2. Create the reservation
    const reservation = await prisma.reservation.create({
      data: {
        firstName: session.firstName || '',
        lastName: session.lastName || '',
        email: session.email || '',
        phone: session.phone || '',
        checkInDate: reservationData.checkInDate,
        checkInTime: reservationData.checkInTime,
        checkOutDate: reservationData.checkOutDate,
        checkOutTime: reservationData.checkOutTime,
        roomType: reservationData.roomType,
        guests: reservationData.guests,
        message: reservationData.message || 'Walk-in Guest',
        status: 'confirmed', // Assuming walk-in is immediately confirmed/paid
      },
    })

    // 3. Mark session as completed
    await prisma.walkInSession.update({
      where: { id: sessionId },
      data: { status: 'completed' },
    })

    revalidatePath('/admin/walk-in')
    revalidatePath('/manager')
    revalidatePath('/admin')

    return { success: true, reservation }
  } catch (error) {
    console.error('Failed to complete walk-in reservation:', error)
    return { success: false, error: 'Failed to create reservation' }
  }
}
