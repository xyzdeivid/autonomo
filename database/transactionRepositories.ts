import { Item, Outflow } from '@/types'
import { db } from './db'
import { insertOutflow } from './outflowRepositories'
import { insertItem, updateItemStock } from './itemRepositories'

export async function addOutflowAndItemToDb(outflow: Outflow, item: Item): Promise<void> {

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