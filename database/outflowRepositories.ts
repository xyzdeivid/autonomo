import { Outflow } from '@/types/index'
import { db } from './db'

export async function insertOutflow(outflow: Outflow) {

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

export async function deleteOutflow(id: string) {

    await db.runAsync(
        'DELETE FROM outflows WHERE _id = ?',
        [id]
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

export async function addOutflowToDb(outflow: Outflow): Promise<void> {

    await insertOutflow(outflow)

}

export async function deleteOutflowToDb(_id: string): Promise<void> {

    await deleteOutflow(_id)

}

export async function updateNewNamedOutflowToDb(newName: string, _id: string): Promise<void> {

    await db.runAsync(
        `UPDATE outflows
        SET name = ?
        WHERE _id = ?`,
        [newName, _id]
    )

}

export async function updateNewDatedOutflowToDb(newDate: string, _id: string): Promise<void> {

    await db.runAsync(
        `UPDATE outflows
        SET date = ?
        WHERE _id = ?`,
        [newDate, _id]
    )

}

export async function updateNewValuedOutflowToDb(newValue: number, _id: string): Promise<void> {

    await db.runAsync(
        `UPDATE outflows
        SET value = ?
        WHERE _id = ?`,
        [newValue, _id]
    )

}