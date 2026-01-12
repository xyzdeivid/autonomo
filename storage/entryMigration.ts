import { Entry, OldEntry } from '@/types/index'
import { db } from '@/database/db'
import { getDataFromAsyncStorage } from './getDataFromAsyncStorage'

// function to convert old entry format to new entry format
const convertOldEntryFormat = (entries: string) => {

    const parsedEntries = JSON.parse(entries)

    const convertedEntries: Entry[] = parsedEntries.map((entry: OldEntry) => {

        return {
            _id: entry._id,
            serviceId: entry.service._id,
            serviceCategory: entry.service.category,
            serviceValue: entry.service.value,
            serviceIsThereAmount: entry.service.isThereAmount,
            serviceAmount: entry.service.amount,
            date: entry.date,
            customer: entry.customer
        }

    })

    return convertedEntries

}

const saveEntryOnNewDB = async (entry: Entry) => {

    try {

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

    } catch (error) {

        throw new Error(`Error saving entry ${entry.serviceId} on new database`, { cause: error })

    }

}

export const saveEntriesOnNewDB = async () => {

    const entriesFromAsyncStorage = await getDataFromAsyncStorage('schedulings')

    if (entriesFromAsyncStorage) {

        const parsedEntries: Entry[] = convertOldEntryFormat(entriesFromAsyncStorage)

        for (const entry of parsedEntries) {

            await saveEntryOnNewDB(entry)

        }

    }

}