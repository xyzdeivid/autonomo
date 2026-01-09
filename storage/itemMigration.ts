import { Item } from '@/context/DocsContext'
import { db } from '@/database/db'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveItemOnNewDB = async (item: Item) => {

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

const getItemsFromAsyncStorage = async (): Promise<string | null> => {

    try {

        const itemsFromAsyncStorage = await AsyncStorage.getItem('items')
        return itemsFromAsyncStorage

    } catch (error) {

        throw new Error('Error getting items from AsyncStorage')
        
    }


}

export const saveItemsOnNewDB = async () => {

    const itemsFromAsyncStorage = await getItemsFromAsyncStorage()

    if (itemsFromAsyncStorage) {

        const parsedItems: Item[] = JSON.parse(itemsFromAsyncStorage)

        for (const item of parsedItems) {

            await saveItemOnNewDB(item)

        }

    }

}