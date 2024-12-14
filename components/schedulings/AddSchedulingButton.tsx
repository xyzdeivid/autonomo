import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { getServices } from '@/functions/schedulings'
import { AntDesign } from '@expo/vector-icons'

interface AddSchedulingButtonProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
    setWhatIsSchedulingCard: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingButton({ setAddSchedulingForm, setButton, setWhatIsSchedulingCard }: AddSchedulingButtonProps) {

    const [services] = useContext(DocsContext).items

    const showForm = () => {
        setAddSchedulingForm(true)
        setButton(false)
    }

    const checkServices = () => {
        getServices(services)[0]
            ? showForm()
            : Alert.alert('Sem item disponível', 'Verifique se você tem algum item ou estoque disponível.')
    }

    return (
        <View style={styles.container}>
            <AntDesign onPress={() => setWhatIsSchedulingCard(true)} name='infocirlce' size={20} color={'rgba(0, 102, 0, 0.5)'} />
            <Pressable
                style={styles.button}
                onPress={() => {
                    checkServices()
                }}
            >
                <Text style={{ color: '#006600' }}>Nova Entrada</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#006600',
        backgroundColor: 'rgba(0, 102, 0, 0.1)'
    }
})