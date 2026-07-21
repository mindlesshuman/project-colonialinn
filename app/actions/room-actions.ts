'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAllRooms() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { roomNumber: 'asc' },
      include: {
        reservations: {
          where: { status: 'confirmed' }, // Only get the active reservation
          take: 1,
        }
      }
    })
    return { success: true, rooms }
  } catch (error) {
    console.error('Failed to get rooms:', error)
    return { success: false, error: 'Failed to fetch rooms.' }
  }
}

// Auto-assign the next available room to a reservation
export async function autoAssignRoom(reservationId: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId }
    })

    if (!reservation) {
      return { success: false, error: 'Reservation not found.' }
    }

    if (reservation.roomId) {
      return { success: true, message: 'Room already assigned.' }
    }

    // Find first available room of matching type
    const availableRoom = await prisma.room.findFirst({
      where: {
        roomType: reservation.roomType,
        status: 'available'
      },
      orderBy: { roomNumber: 'asc' }
    })

    if (!availableRoom) {
      return { success: false, error: `No available ${reservation.roomType}s at this moment.` }
    }

    // Assign room and update statuses
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { roomId: availableRoom.id }
    })

    await prisma.room.update({
      where: { id: availableRoom.id },
      data: { status: 'occupied' }
    })

    revalidatePath('/admin/rooms')
    revalidatePath('/admin/walk-in')
    return { success: true, roomNumber: availableRoom.roomNumber }
  } catch (error) {
    console.error('Failed to auto assign room:', error)
    return { success: false, error: 'System error during room assignment.' }
  }
}

// Manually check out a room, freeing it for the next guest
export async function checkOutRoom(roomId: string, reservationId: string) {
  try {
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { status: 'completed' } // mark reservation as completed
    })

    await prisma.room.update({
      where: { id: roomId },
      data: { status: 'available' } // free the room
    })

    revalidatePath('/admin/rooms')
    return { success: true }
  } catch (error) {
    console.error('Failed to checkout room:', error)
    return { success: false, error: 'Failed to process checkout.' }
  }
}

// Extend a reservation by a specific number of hours
export async function extendRoomReservation(reservationId: string, hours: number, roomType: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId }
    })

    if (!reservation) return { success: false, error: 'Reservation not found.' }

    // Calculate new checkout date and time
    const [year, month, day] = reservation.checkOutDate.split('-').map(Number)
    const [hrs, mins] = reservation.checkOutTime.split(':').map(Number)
    const dateObj = new Date(year, month - 1, day, hrs, mins)
    
    dateObj.setHours(dateObj.getHours() + hours)

    const outYear = dateObj.getFullYear()
    const outMonth = String(dateObj.getMonth() + 1).padStart(2, '0')
    const outDay = String(dateObj.getDate()).padStart(2, '0')
    const outHours = String(dateObj.getHours()).padStart(2, '0')
    const outMins = String(dateObj.getMinutes()).padStart(2, '0')

    const newCheckOutDate = `${outYear}-${outMonth}-${outDay}`
    const newCheckOutTime = `${outHours}:${outMins}`

    // Calculate extension price
    const rate = roomType === 'Standard Room' ? 50 : 100
    const addedPrice = hours * rate

    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        checkOutDate: newCheckOutDate,
        checkOutTime: newCheckOutTime,
        extensionHours: reservation.extensionHours + hours,
        extensionPrice: reservation.extensionPrice + addedPrice
      }
    })

    revalidatePath('/admin/rooms')
    return { success: true }
  } catch (error) {
    console.error('Failed to extend room:', error)
    return { success: false, error: 'Failed to extend reservation.' }
  }
}

