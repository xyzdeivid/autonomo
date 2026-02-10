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

                const storedTheme = await AsyncStorage.getItem('theme')

                if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {

                    setTheme(storedTheme)
                    setStatusBarBackgroundColor(storedTheme === 'dark' ? '#000000' : '#FFFFFF')
                    setStatusBarStyle(storedTheme === 'dark' ? 'light' : 'dark')

                }
                
                if (storedTheme === 'system' && colorScheme != null) {

                    setStatusBarBackgroundColor(colorScheme === 'dark' ? '#000000' : '#FFFFFF')
                    setStatusBarStyle(colorScheme === 'dark' ? 'light' : 'dark')

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