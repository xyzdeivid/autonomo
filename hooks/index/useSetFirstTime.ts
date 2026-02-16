import { DocsContext } from '@/context/DocsContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from 'expo-router/build/global-state/routing'
import { useContext } from 'react'
import { Alert } from 'react-native'

export function useSetFirstTime() {

    const [, setShowFirstTime] = useContext(DocsContext).firstTime

    async function setFirstTime(route: 'items' | undefined) {

        try {

            await AsyncStorage.setItem('first-time', '.')
            setShowFirstTime(false)
            if (route) navigate(`/${route}`)

        } catch {

            Alert.alert('Erro', 'Erro ao registrar início no app.')

        }

    }

    return { setFirstTime }

}