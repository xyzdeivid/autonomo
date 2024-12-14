import { Pressable, StyleSheet, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useContext, useEffect } from 'react'
import { DocsContext } from '@/context/DocsContext'
import YearOptions from './YearOptions'
import { availableYears } from '@/functions/info'

interface GeneralButtonProps {
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
    setGeneralButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GeneralButton({ setAddItemsForm, setGeneralButton }: GeneralButtonProps) {

    const [entries] = useContext(DocsContext).entries
    const years = availableYears(entries)

    return (
        <View style={{
            ...styles.container,
            justifyContent: years.length > 1 ? 'space-between' : 'flex-end'
        }}>
            {
                years.length === 1
                    && Number(years[0]) === new Date().getFullYear()
                    ? null
                    : <YearOptions
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
                <Entypo name='add-to-list' size={28} color='#08819B' />
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
        borderWidth: 1,
        borderColor: '#08819B',
        backgroundColor: 'rgba(8, 129, 155, 0.1)'
    }
})