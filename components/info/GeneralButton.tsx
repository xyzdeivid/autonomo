import { Pressable, StyleSheet, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

interface GeneralButtonProps {
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
    setGeneralButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GeneralButton({ setAddItemsForm, setGeneralButton }: GeneralButtonProps) {

    const [entries] = useContext(DocsContext).schedulings
    const [currentYear, setCurrentYear] = useContext(DocsContext).currentYear

    const availableYears = () => {

        let years = [String(currentYear)]

        years.push(...entries.map(entry => entry.date.split('-')[0]))

        years = [...new Set(years)]

        return years.length > 1
            ? years.sort((a, b) => Number(b) - Number(a))
            : years

    }

    return (
        <View style={{
            ...styles.container,
            justifyContent: availableYears().length > 0 ? 'space-between' : 'flex-end'
        }}>
            {
                availableYears().length > 0 &&
                <Picker
                    selectedValue={currentYear}
                    style={styles.yearContainer}
                    onValueChange={year => setCurrentYear(year)}
                >
                    {availableYears().map(year => (
                        <Picker.Item value={year} label={year} key={year} />
                    ))}
                </Picker>
            }
            <Pressable
                style={styles.buttonContainer}
                onPress={() => {
                    setAddItemsForm(true)
                    setGeneralButton(false)
                }}
            >
                <Entypo name='add-to-list' size={28} color='#FFFFFF' />
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#08819B'
    },
    yearContainer: {
        width: '30%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
})