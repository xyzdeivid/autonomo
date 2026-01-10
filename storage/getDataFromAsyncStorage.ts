import AsyncStorage from '@react-native-async-storage/async-storage'

export const getDataFromAsyncStorage = async (dataToGet: string): Promise<string | null> => {

    try {

        const dataFromAsyncStorage = await AsyncStorage.getItem(dataToGet)
        return dataFromAsyncStorage

    } catch (error) {

        throw new Error(`Error getting ${dataToGet} from AsyncStorage`)
        
    }


}