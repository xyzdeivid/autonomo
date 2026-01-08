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

    const dataFromAsync = {
        items: parsedItems,
        outflows: parsedOutflows,
        entries: parsedEntries
    }

    return dataFromAsync

}

const checkIfThereIsDataFromAsync = (dataFromAsync: {
    items: Item[];
    outflows: Outflow[];
    entries: Entry[];
}) => {

    if (dataFromAsync.items.length > 0 ||
        dataFromAsync.outflows.length > 0 ||
        dataFromAsync.entries.length > 0) {

            return true

    }

    return false

}

const migrateDataToNewDB = async (dataFromAsync: {
    items: Item[];
    outflows: Outflow[];
    entries: Entry[];
}) => {

    // migrating data to new database

    const items = dataFromAsync.items
    const outflows = dataFromAsync.outflows
    const entries = dataFromAsync.entries

    if (items.length > 0) {

        for (const item of items) {

            await saveItemOnNewDB(item)

        }

    }

    if (outflows.length > 0) {

        for (const outflow of outflows) {

            await saveOutflowOnNewDB(outflow)

        }

    }

    if (entries.length > 0) {

        for (const entry of entries) {

            await saveEntryOnNewDB(entry)

        }

    }

    // cleaning old AsyncStorage data
    await AsyncStorage.multiRemove([
        'items',
        'expenses',
        'schedulings'
    ])

}

export const migrationData = async () => {

    const dbVersion = await getVersionFlag()

    if (!dbVersion) {

        // getting data from AsyncStorage
        const dataFromAsync = await getDataFromAsyncStorage()

        // checking if there is data to migrate
        const thereIsDataFromAsync = checkIfThereIsDataFromAsync(dataFromAsync)

        if (thereIsDataFromAsync) {

            // migrating data to new database
            await migrateDataToNewDB(dataFromAsync)

        }

        // saving database version flag
        await AsyncStorage.setItem('dbVersion', '1')

    }

}