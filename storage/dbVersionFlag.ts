import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const getVersionFlag = async () => {

    try {

        const dbVersion = await AsyncStorage.getItem('dbVersion')
        return dbVersion
        
    } catch {

        Alert.alert('Erro ao obter a versão do banco de dados.')
        return null
        
    }

}

export default getVersionFlag