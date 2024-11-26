import { Pressable, StyleSheet, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import YearOptions from './YearOptions'
import { availableYears } from '@/functions/info'

interface GeneralButtonProps {
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
    setGeneralButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GeneralButton({ setAddItemsForm, setGeneralButton }: GeneralButtonProps) {

    const [entries] = useContext(DocsContext).schedulings
    const [currentYear] = useContext(DocsContext).currentYear
    const years = availableYears(currentYear, entries)

    return (
        <View style={styles.container}>
            {
                years.length > 0 &&
                <YearOptions
                    availableYears={years}
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