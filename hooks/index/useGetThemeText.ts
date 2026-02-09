import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

export function useGetThemeText() {

    const theme = useContext(ThemeContext).theme

    if (theme === 'light') return 'Claro'
    if (theme === 'dark') return 'Escuro'
    if (theme === 'system') return 'Sistema'

}