import { ThemeContext } from '@/context/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import { useContext } from 'react'
import { Alert, useColorScheme } from 'react-native'

export function useSetTheme() {

    const colorScheme = useColorScheme()

    const setThemeOnUI = useContext(ThemeContext).setTheme

    const setTheme = async (theme: 'light' | 'dark' | 'system') => {

        const themeToApply = theme === 'system' ? colorScheme : theme

        try {

            await AsyncStorage.setItem('theme', theme)
            setThemeOnUI(theme)
            setStatusBarBackgroundColor(themeToApply === 'dark' ? '#000000' : '#FFFFFF')
            setStatusBarStyle(themeToApply === 'dark' ? 'light' : 'dark')

        } catch {

            Alert.alert(
                'Erro',
                'Não foi possível salvar a preferência de tema. Tente novamente.'
            )

        }

    }

    return { setTheme }

}