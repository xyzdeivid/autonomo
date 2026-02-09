import { Pressable, StyleSheet, Text } from 'react-native'
import { OptionsListContainer } from './OptionsListContainer'
import { useSetTheme } from '@/hooks/index/useSetTheme'

interface ThemeOptionsListProps {
    setShowThemeOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowSettingsCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function ThemeOptionsList({ setShowThemeOptionsList, setShowSettingsCard }: ThemeOptionsListProps) {

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
                style={styles.overlay}
                onPress={() => { }}
            >
                <Pressable
                    style={{ ...styles.button, borderBottomWidth: StyleSheet.hairlineWidth }}
                    onPress={() => {
                        onThemeOptionPress('system')
                    }}
                >
                    <Text>Sistema</Text>
                </Pressable>
                <Pressable
                    style={{ ...styles.button, borderBottomWidth: StyleSheet.hairlineWidth }}
                    onPress={() => {
                        onThemeOptionPress('light')
                    }}
                >
                    <Text>Claro</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        onThemeOptionPress('dark')

                    }}
                >
                    <Text>Escuro</Text>
                </Pressable>
            </Pressable>
        </OptionsListContainer>
    )

}

const styles = StyleSheet.create({

    overlay: {
        width: 200,
        backgroundColor: '#FFF',
        borderRadius: 8,
    },

    button: {
        padding: 12,
        alignItems: 'center',
        borderBottomColor: '#00000040'
    }

})