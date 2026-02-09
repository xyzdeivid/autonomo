import { months } from '@/constants/common'
import { DocsContext } from '@/context/DocsContext'
import { useGetThemeText } from '@/hooks/index/useGetThemeText'
import { getMonthName } from '@/utils/common'
import { FontAwesome5, Fontisto } from '@expo/vector-icons'
import { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'

interface SettingsOptionsProps {
    setShowAvailableMonthsOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowThemeOptionsList: React.Dispatch<React.SetStateAction<boolean>>
}

export function SettingsOptions({ setShowAvailableMonthsOptionsList, setShowThemeOptionsList }: SettingsOptionsProps) {

    const appDocs = useContext(DocsContext)
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const themeText = useGetThemeText()

    return (
        <>
            <View style={{ ...styles.buttonContainer, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#FFF' }}>
                <View style={styles.label}>
                    <FontAwesome5 name="calendar-day" size={12} color="black" />
                    <Text>Período</Text>
                </View>
                <TouchableOpacity
                    style={{ ...styles.button, borderTopRightRadius: 8 }}
                    onPress={() => setShowAvailableMonthsOptionsList(true)}
                >
                    <Text style={{ textAlign: 'center' }}>{getMonthName(months, selectedMonth)}/{currentYear}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.buttonContainer, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#FFF' }}>
                <View style={styles.label}>
                    <FontAwesome5 name="paint-brush" size={12} color="black" />
                    <Text>Tema</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowThemeOptionsList(true)}
                >
                    <Text style={{ textAlign: 'center' }}>{themeText}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.label}>
                    <Fontisto name="bell-alt" size={12} color="black" />
                    <Text>Lembrete</Text>
                </View>
                <Pressable style={styles.button}>
                    <Text style={{ textAlign: 'center' }}>Nenhum</Text>
                </Pressable>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex: 1
    },

    overlay: {
        backgroundColor: '#fff',
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    label: {
        backgroundColor: '#ebebeb',
        padding: 8,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    button: {
        backgroundColor: '#d3d3d3',
        width: 120,
        padding: 8
    }

})