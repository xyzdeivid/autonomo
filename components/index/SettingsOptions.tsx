import { months } from '@/constants/common'
import { DocsContext } from '@/context/DocsContext'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { useGetThemeText } from '@/hooks/index/useGetThemeText'
import { colors } from '@/styles/appColors'
import { getMonthName } from '@/utils/common'
import { FontAwesome5, Fontisto } from '@expo/vector-icons'
import { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface SettingsOptionsProps {
    setShowAvailableMonthsOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowThemeOptionsList: React.Dispatch<React.SetStateAction<boolean>>
}

export function SettingsOptions({ setShowAvailableMonthsOptionsList, setShowThemeOptionsList }: SettingsOptionsProps) {

    const theme = useGetTheme()

    const appDocs = useContext(DocsContext)
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const themeText = useGetThemeText()

    const options = [
        {
            label: 'Período',
            icon: <FontAwesome5
                name='calendar-day'
                size={12}
                color={theme === 'dark' ? colors.cardText.dark : colors.cardText.light}
            />,
            onPress: () => setShowAvailableMonthsOptionsList(true),
            text: `${getMonthName(months, selectedMonth)}/${currentYear}`
        },
        {
            label: 'Tema',
            icon: <FontAwesome5
                name='paint-brush'
                size={12}
                color={theme === 'dark' ? colors.cardText.dark : colors.cardText.light}
            />,
            onPress: () => setShowThemeOptionsList(true),
            text: themeText
        },
        {
            label: 'Lembrete',
            icon: <Fontisto
                name='bell-alt'
                size={12}
                color={theme === 'dark' ? colors.cardText.dark : colors.cardText.light}
            />,
            onPress: () => { /* Lógica para abrir opções de lembrete */ },
            text: 'Nenhum'
        }
    ]

    return (
        <>
            {options.map((option, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            ...styles.buttonContainer
                        }}
                    >
                        <View
                            style={{
                                ...styles.label,
                                backgroundColor: theme === 'dark' ? colors.cardBackground.dark : '#A2A2A2'
                            }}
                        >
                            {option.icon}
                            <Text
                                style={{ color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}
                            >
                                {option.label}
                            </Text>
                        </View>
                        <View
                            style={styles.button}
                        >
                            <TouchableOpacity onPress={option.onPress}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
                                    }}
                                >
                                    {option.text}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </>
    )

}

const styles = StyleSheet.create({

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    label: {
        padding: 8,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    button: {
        width: 120,
        padding: 8
    }

})