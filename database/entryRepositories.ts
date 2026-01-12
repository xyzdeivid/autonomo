import { Entry } from '@/types/index'
import { db } from './db'

export async function getAllEntries(): Promise<Entry[]> {

    const rows = await db.getAllAsync<Entry>('SELECT * FROM entries')

    return rows.map(row => ({
        _id: row._id,
        serviceId: row.serviceId,
        date: row.date,
        serviceCategory: row.serviceCategory,
        serviceValue: row.serviceValue,
        serviceIsThereAmount: row.serviceIsThereAmount,
        serviceAmount: row.serviceAmount ?? undefined,
        customer: row.customer ?? undefined
    }))

}