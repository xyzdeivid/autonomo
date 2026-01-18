import { Item, Outflow } from '@/types'
import { db } from './db'

export async function addOutflowAndItemToDb(outflow: Outflow, item: Item): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await db.runAsync(
            'INSERT INTO outflows (_id, name, date, value, amount) VALUES (?, ?, ?, ?, ?)',
            [
                outflow._id,
                outflow.name,
                outflow.date,
                outflow.value,
                outflow.amount ?? null
            ]
        )

        await db.runAsync(
            'INSERT INTO items (_id, category, value, isThereAmount, resale, amount) VALUES (?, ?, ?, ?, ?, ?)',
            [
                item._id,
                item.category,
                item.value,
                item.isThereAmount ? 1 : 0,
                item.resale ? 1 : 0,
                item.amount ?? null
            ]
        )

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}

export async function addOutflowAndEditItemStockToDb(outflow: Outflow, newStock: number, itemId: string): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await db.runAsync(
            'INSERT INTO outflows (_id, name, date, value, amount) VALUES (?, ?, ?, ?, ?)',
            [
                outflow._id,
                outflow.name,
                outflow.date,
                outflow.value,
                outflow.amount ?? null
            ]
        )

        await db.runAsync(
            `UPDATE items
        SET amount = ?
        WHERE _id = ?`,
            [newStock, itemId]
        )

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}