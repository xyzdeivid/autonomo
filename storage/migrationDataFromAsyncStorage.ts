import getVersionFlag from './dbVersionFlag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { saveItemsOnNewDB } from './itemMigration'
import { saveOutflowsOnNewDB } from './outflowMigration'

const migrateDataToNewDB = async () => {

    // migrating items
    await saveItemsOnNewDB()

    // migrating outflows
    await saveOutflowsOnNewDB()

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


        } catch (error) {

            if (error instanceof Error) {

                Alert.alert('MIGRATION ERROR', error.message)

            } else {

                Alert.alert('MIGRATION ERROR', 'Unknown error during data migration')

            }
        }

    }

}