import { Item } from '@/types/index'
import { db } from '@/database/db'
import { getDataFromAsyncStorage } from './getDataFromAsyncStorage'

const saveItemOnNewDB = async (item: Item) => {

    try {

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

    } catch (error) {

        throw new Error(`Error saving item ${item._id} on new database`, { cause: error })

    }

}

export const saveItemsOnNewDB = async () => {

    const itemsFromAsyncStorage = await getDataFromAsyncStorage('items')

    if (itemsFromAsyncStorage) {

        const parsedItems: Item[] = JSON.parse(itemsFromAsyncStorage)

        for (const item of parsedItems) {

            await saveItemOnNewDB(item)

        }

    }

}