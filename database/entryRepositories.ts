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

export async function addEntryToDb(entry: Entry): Promise<void> {

    await db.runAsync(
        `INSERT INTO entries
           (_id, serviceId, serviceCategory, serviceValue, serviceIsThereAmount, serviceAmount, date, customer)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            entry._id,
            entry.serviceId,
            entry.serviceCategory,
            entry.serviceValue,
            entry.serviceIsThereAmount ? 1 : 0,
            entry.serviceAmount ?? null,
            entry.date,
            entry.customer ?? null
        ]
    )

}

export async function addCustomerNameToDb(customerName: string, id: string): Promise<void> {

    await db.runAsync(
        `UPDATE entries
        SET customer = ?
        WHERE _id = ?`,
        [customerName, id]
    )

}

export async function editCustomerNameToDb(customerName: string, id: string): Promise<void> {

    await db.runAsync(
        `UPDATE entries
        SET customer = ?
        WHERE _id = ?`,
        [customerName, id]
    )

}

export async function editEntryDateToDb(newDate: string, id: string): Promise<void> {

    await db.runAsync(
        `UPDATE entries
        SET date = ?
        WHERE _id = ?`,
        [newDate, id]
    )

}

export async function deleteEntryToDb(_id: string): Promise<void> {

    await db.runAsync(
        'DELETE FROM entries WHERE _id = ?',
        [_id]
    )

}