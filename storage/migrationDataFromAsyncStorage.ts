import getVersionFlag from './dbVersionFlag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { saveItemsOnNewDB } from './itemMigration'

/* interface OldEntryFormat {
    _id: string
    service: Item
    date: string
    customer?: string
} */

// function to convert old entry format to new entry format
/* const convertOldEntryFormat = (entries: string) => {

    const parsedEntries = JSON.parse(entries)

    const convertedEntries: Entry[] = parsedEntries.map((entry: OldEntryFormat) => {

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

} */

const migrateDataToNewDB = async () => {

    // migrating items
    await saveItemsOnNewDB()

    // cleaning old AsyncStorage data
    try {

        await AsyncStorage.multiRemove([
            'items',
            'expenses',
            'schedulings'
        ])

    } catch (error) {

        throw new Error(
            'Error cleaning old AsyncStorage data',
            { cause: error }
        )

    }
    
}

export const migrateData = async () => {

    const dbVersion = await getVersionFlag()

    if (!dbVersion) {

        try {

            await migrateDataToNewDB()

            // saving database version flag
            await AsyncStorage.setItem('dbVersion', '1')

            console.log('Data migration completed successfully')


        } catch (error) {

            if (error instanceof Error) {

                Alert.alert('MIGRATION ERROR', error.message)

            } else {

                Alert.alert('MIGRATION ERROR', 'Unknown error during data migration')

            }
        }

    }

}