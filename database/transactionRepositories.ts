import { Entry, Item, Outflow } from '@/types'
import { db } from './db'
import { deleteOutflow, insertOutflow } from './outflowRepositories'
import { insertItem, updateItemStock } from './itemRepositories'
import { deleteEntry, insertEntry } from './entryRepositories'

export async function addItemAndOutflowToDb(outflow: Outflow, item: Item): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await insertOutflow(outflow)

        await insertItem(item)

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}

export async function addOutflowAndEditItemStockToDb(outflow: Outflow, newStock: number, itemId: string): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await insertOutflow(outflow)

        await updateItemStock(newStock, itemId)

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}

export async function addEntryAndReduceItemStockToDb(entry: Entry, newStock: number, itemId: string): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await insertEntry(entry)

        await updateItemStock(newStock, itemId)

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}

export async function deleteOutflowAndReduceItemStockToDb(outflowId: string, newStock: number, itemId: string): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await deleteOutflow(outflowId)

        await updateItemStock(newStock, itemId)

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}

export async function deleteEntryAndIncrementItemStockToDb(entryId: string, newStock: number, itemId: string): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await deleteEntry(entryId)

        await updateItemStock(newStock, itemId)

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}

export async function editEntryAmountAndItemStockToDb(newAmount: number, entryId: string, newProductStock: number, productId: string): Promise<void> {

    try {

        await db.runAsync('BEGIN TRANSACTION')

        await db.runAsync(
            `UPDATE entries
            SET serviceAmount = ?
            WHERE _id = ?`,
            [newAmount, entryId]
        )

        await updateItemStock(newProductStock, productId)

        await db.runAsync('COMMIT')

    } catch (error) {

        await db.runAsync('ROLLBACK')
        throw error

    }

}