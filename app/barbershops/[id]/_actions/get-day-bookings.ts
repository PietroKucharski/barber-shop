"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../../../_lib/prisma"

export const getDayBookings = async (date: Date, barbershopId: string) => {
    const bookings = await db.booking.findMany({
        where: {
            barbershopId,
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    })

    return bookings;
}