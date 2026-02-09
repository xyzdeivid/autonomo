import { Pressable, StyleSheet, Text } from 'react-native'
import { OptionsListContainer } from './OptionsListContainer'

interface ThemeOptionsListProps {
    setShowThemeOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowSettingsCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function ThemeOptionsList({ setShowThemeOptionsList, setShowSettingsCard }: ThemeOptionsListProps) {

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
                >
                    <Text>Sistema</Text>
                </Pressable>
                <Pressable
                    style={{ ...styles.button, borderBottomWidth: StyleSheet.hairlineWidth }}
                >
                    <Text>Claro</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
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