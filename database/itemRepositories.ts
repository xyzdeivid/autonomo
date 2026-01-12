import { db } from './db'
import { Item } from '@/types/index'

export async function getAllItems(): Promise<Item[]> {

    const rows = await db.getAllAsync<Item>('SELECT * FROM items')

    return rows.map(row => ({
        _id: row._id,
        category: row.category,
        value: row.value,
        isThereAmount: !!row.isThereAmount,
        resale: !!row.resale,
        amount: row.amount ?? undefined
    }))

}

export async function addItemToDb(item: Item): Promise<void> {

    await db.runAsync(
        `INSERT INTO items 
        (_id, category, value, isThereAmount, resale, amount)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            item._id,
            item.category,
            item.value,
            item.isThereAmount ? 1 : 0,
            item.resale ? 1 : 0,
            item.amount ?? null
        ]
    )

}

export async function deleteItemToDb(id: string): Promise<void> {

    await db.runAsync(
        'DELETE FROM items WHERE _id = ?',
        [id]
    )

}

export async function updateNewNamedItemToDb(newName: string, oldName: string): Promise<void> {

    await db.runAsync(
        `UPDATE items
        SET _id = ?
        WHERE _id = ?`,
        [newName, oldName]
    )

}

export async function updateNewValuedItemToDB(newValue: number, name: string): Promise<void> {

    await db.runAsync(
        `UPDATE items
        SET value = ?
        WHERE _id = ?`,
        [newValue, name]
    )

}

export async function updateNewStockedItemToDB(newStock: number, name: string): Promise<void> {

    await db.runAsync(
        `UPDATE items
        SET amount = ?
        WHERE _id = ?`,
        [newStock, name]
    )

}