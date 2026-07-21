'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function extendStay(reservationId: string, additionalHours: number) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    })

    if (!reservation) {
      return { success: false, error: 'Reservation not found.' }
    }

    // Calculate extension cost
    const ratePerHour = reservation.roomType === 'Family Room' || reservation.roomType === 'family' ? 100 : 50
    const additionalPrice = additionalHours * ratePerHour

    // Calculate new checkout date and time
    const [year, month, day] = reservation.checkOutDate.split('-').map(Number)
    const [hours, minutes] = reservation.checkOutTime.split(':').map(Number)
    
    const checkoutObj = new Date(year, month - 1, day, hours, minutes)
    checkoutObj.setHours(checkoutObj.getHours() + additionalHours)

    const outYear = checkoutObj.getFullYear()
    const outMonth = String(checkoutObj.getMonth() + 1).padStart(2, '0')
    const outDay = String(checkoutObj.getDate()).padStart(2, '0')
    const outHours = String(checkoutObj.getHours()).padStart(2, '0')
    const outMins = String(checkoutObj.getMinutes()).padStart(2, '0')

    const newCheckOutDate = `${outYear}-${outMonth}-${outDay}`
    const newCheckOutTime = `${outHours}:${outMins}`

    // Update DB
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        extensionHours: reservation.extensionHours + additionalHours,
        extensionPrice: reservation.extensionPrice + additionalPrice,
        checkOutDate: newCheckOutDate,
        checkOutTime: newCheckOutTime,
      },
    })

    revalidatePath(`/guest/receipt/${reservationId}`)
    revalidatePath('/admin')
    revalidatePath('/admin/walk-in')

    return { success: true }
  } catch (error) {
    console.error('Failed to extend stay:', error)
    return { success: false, error: 'Failed to process extension.' }
  }
}
