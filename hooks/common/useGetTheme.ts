import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { useColorScheme } from 'react-native'

export function useGetTheme() {

    const theme = useContext(ThemeContext).theme

    const colorScheme = useColorScheme()

    if (theme === 'system') return colorScheme

    return theme

}