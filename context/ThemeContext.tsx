import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import { createContext, useEffect, useState } from 'react'
import { Alert, useColorScheme } from 'react-native'

interface ThemeContextType {
    theme: 'light' | 'dark' | 'system'
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark' | 'system'>>
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    setTheme: () => { }
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const colorScheme = useColorScheme()

    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

    useEffect(() => {

        const getThemeFromStorage = async () => {

            try {

                let storedTheme = await AsyncStorage.getItem('theme')

                if (typeof storedTheme !== 'string'
                    && typeof colorScheme === 'string') {

                    await AsyncStorage.setItem('theme', 'system')
                    storedTheme = 'system'

                }

                if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {

                    let initialTheme = storedTheme === 'system' ? colorScheme : storedTheme

                    setTheme(storedTheme)
                    setStatusBarBackgroundColor(initialTheme === 'dark' ? '#000000' : '#FFFFFF')
                    setStatusBarStyle(initialTheme === 'dark' ? 'light' : 'dark')

                }

            } catch {

                Alert.alert(
                    'Erro ao carregar tema',
                    'Não foi possível carregar o tema salvo. O tema padrão será usado.'
                )

            }

        }

        getThemeFromStorage()

    }, [colorScheme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}