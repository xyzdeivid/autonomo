import { Pressable, StyleSheet, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useContext, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'
import YearOptions from './YearOptions'
import { availableYears } from '@/functions/info'
import Ionicons from '@expo/vector-icons/Ionicons'

interface GeneralButtonProps {
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
    setGeneralButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GeneralButton({ setAddItemsForm, setGeneralButton }: GeneralButtonProps) {

    const [entries] = useContext(DocsContext).schedulings
    const [currentYear] = useContext(DocsContext).currentYear
    const years = availableYears(currentYear, entries)
    const [showYearOptions, setShowYearOptions] = useState(false)

    return (
        <View style={styles.container}>
            {
                showYearOptions
                    ? <YearOptions
                        availableYears={years}
                        setShowYearOptions={setShowYearOptions}
                    />
                    : <Ionicons onPress={() => {
                        setShowYearOptions(true)
                    }}
                        name='calendar-clear'
                        size={24} color='rgba(8, 129, 155, 0.5)'
                    />
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#08819B'
    }
})