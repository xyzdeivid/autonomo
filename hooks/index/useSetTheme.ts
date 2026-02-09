import { ThemeContext } from '@/context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import { Alert } from 'react-native'

export function useSetTheme() {

    const setThemeOnUI = useContext(ThemeContext).setTheme

    const setTheme = async (theme: 'light' | 'dark' | 'system') => {

        try {

            await AsyncStorage.setItem('theme', theme)
            setThemeOnUI(theme)

        } catch {

            Alert.alert(
                'Erro',
                'Não foi possível salvar a preferência de tema. Tente novamente.'
            )

        }

    }

    return { setTheme }

}