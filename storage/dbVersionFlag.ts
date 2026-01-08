import AsyncStorage from '@react-native-async-storage/async-storage'

const getVersionFlag = async () => {

    const dbVersion = await AsyncStorage.getItem('dbVersion')

    if (dbVersion) return Number(dbVersion)

    return 0

}

export default getVersionFlag