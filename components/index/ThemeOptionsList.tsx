import { Pressable, StyleSheet, Text } from 'react-native'
import { OptionsListContainer } from './OptionsListContainer'
import { useSetTheme } from '@/hooks/index/useSetTheme'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'

interface ThemeOptionsListProps {
    setShowThemeOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowSettingsCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function ThemeOptionsList({ setShowThemeOptionsList, setShowSettingsCard }: ThemeOptionsListProps) {

    const theme = useGetTheme()

    const setTheme = useSetTheme().setTheme

    function onThemeOptionPress(theme: 'light' | 'dark' | 'system') {
        setTheme(theme)
        setShowThemeOptionsList(false)
        setShowSettingsCard(false)
    }

    return (
        <OptionsListContainer
            onPressOutside={() => {
                setShowThemeOptionsList(false)
            }}
        >
            <Pressable
                style={{ ...styles.overlay, backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light }}
                onPress={() => { }}
            >
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        onThemeOptionPress('system')
                    }}
                >
                    <Text style={{ color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>Sistema</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        onThemeOptionPress('light')
                    }}
                >
                    <Text style={{ color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>Claro</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        onThemeOptionPress('dark')

                    }}
                >
                    <Text style={{ color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>Escuro</Text>
                </Pressable>
            </Pressable>
        </OptionsListContainer>
    )

}

const styles = StyleSheet.create({

    overlay: {
        width: 200,
        borderRadius: 8,
    },

    button: {
        padding: 12,
        alignItems: 'center'
    }

})