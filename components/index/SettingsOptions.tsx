import { months } from '@/constants/common'
import { DocsContext } from '@/context/DocsContext'
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
                color={colors.cardText.dark}
            />,
            onPress: () => setShowAvailableMonthsOptionsList(true),
            text: `${getMonthName(months, selectedMonth)}/${currentYear}`
        },
        {
            label: 'Tema',
            icon: <FontAwesome5
                name='paint-brush'
                size={12}
                color={colors.cardText.dark}
            />,
            onPress: () => setShowThemeOptionsList(true),
            text: themeText
        },
        {
            label: 'Lembrete',
            icon: <Fontisto
                name='bell-alt'
                size={12}
                color={colors.cardText.dark}
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
                                backgroundColor: colors.cardBackground.dark
                            }}
                        >
                            {option.icon}
                            <Text
                                style={{ color: colors.cardText.dark }}
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
                                        color: colors.cardText.dark
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
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF80'
    },

    button: {
        width: 120,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF80',
        padding: 8
    }

})