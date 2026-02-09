import AsyncStorage from '@react-native-async-storage/async-storage'
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

                if (storedTheme === 'light' || storedTheme === 'dark') {

                    setTheme(storedTheme)

                } else if (storedTheme === 'system' && colorScheme != null) {

                    setTheme(colorScheme)

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