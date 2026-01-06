import { db } from './db'
import { Item, Outflow } from '@/context/DocsContext'

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