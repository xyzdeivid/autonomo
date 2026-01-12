import { Outflow } from '@/types/index'
import { db } from './db'

export async function addOutflowToDb(outflow: Outflow): Promise<void> {

    await db.runAsync(
        `INSERT INTO outflows (_id, name, date, value, amount)
        VALUES (?, ?, ?, ?, ?)`,
        [
            outflow._id,
            outflow.name,
            outflow.date,
            outflow.value,
            outflow.amount ?? null
        ]
    )

}

export async function getAllOutflows(): Promise<Outflow[]> {

    const rows = await db.getAllAsync<Outflow>('SELECT * FROM outflows')

    return rows.map(row => ({
        _id: row._id,
        name: row.name,
        date: row.date,
        value: row.value,
        amount: row.amount ?? undefined
    }))

}