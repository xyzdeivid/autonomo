import { db } from './db'
import { Entry, Item, Outflow } from '@/context/DocsContext'

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

export async function updateItemToDb(newName: string, oldName: string): Promise<void> {

    await db.runAsync(
        `UPDATE items
        SET _id = ?
        WHERE _id = ?`,
        [newName, oldName]
    )

}

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