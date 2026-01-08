import getVersionFlag from './dbVersionFlag'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const migrationData = async () => {

    const dbVersion = await getVersionFlag()

    if (dbVersion < 1) {

        // perform migration steps for version 1

        await AsyncStorage.setItem('dbVersion', '1')

        // future migration function can be added here

    }

}