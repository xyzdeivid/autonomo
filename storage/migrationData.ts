import { Entry, Item, Outflow } from '@/context/DocsContext'
import getVersionFlag from './dbVersionFlag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '@/database/db'

const saveItemOnNewDB = async (item: Item) => {

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

const saveOutflowOnNewDB = async (outflow: Outflow) => {

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

const saveEntryOnNewDB = async (entry: Entry) => {

    await db.runAsync(
        `INSERT INTO entries
       (_id, serviceId, serviceCategory, serviceValue, serviceIsThereAmount, serviceAmount, date, customer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            entry._id,
            entry.serviceId,
            entry.serviceCategory,
            entry.serviceValue,
            entry.serviceIsThereAmount ? 1 : 0,
            entry.serviceAmount ?? null,
            entry.date,
            entry.customer ?? null
        ]
    )

}

const getDataFromAsyncStorage = async () => {

    const items = await AsyncStorage.getItem('items')
    const outflows = await AsyncStorage.getItem('expenses')
    const entries = await AsyncStorage.getItem('schedulings')

    let parsedItems: Item[] = []
    let parsedOutflows: Outflow[] = []
    let parsedEntries: Entry[] = []

    try {

        parsedItems = items ? JSON.parse(items) : []
        
    } catch {

        parsedItems = []

    }

    try {

        parsedOutflows = outflows ? JSON.parse(outflows) : []

    } catch {

        parsedOutflows = []

    }

    try {

        parsedEntries = entries ? JSON.parse(entries) : []

    } catch {

        parsedEntries = []
        
    }

    if (parsedItems.length > 0) {

        for (const item of parsedItems) {

            await saveItemOnNewDB(item)

        }

    }

    if (parsedOutflows.length > 0) {

        for (const outflow of parsedOutflows) {

            await saveOutflowOnNewDB(outflow)

        }

    }

    if (parsedEntries.length > 0) {

        for (const entry of parsedEntries) {

            await saveEntryOnNewDB(entry)

        }

    }

}

export const migrationData = async () => {

    const dbVersion = await getVersionFlag()

    if (dbVersion < 1) {

        try {

            // perform migration steps for version 1

            await getDataFromAsyncStorage()

            await AsyncStorage.setItem('dbVersion', '1')

        } catch (error) {

            throw error

        }

    }

}