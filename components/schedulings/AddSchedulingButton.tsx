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
            <Pressable
                style={styles.aboutButton}
                onPress={() => setWhatIsSchedulingCard(true)}
            >
                <Text style={{ color: 'rgba(0, 102, 0, 0.5)', fontSize: 12, marginEnd: 3 }}>Sobre</Text>
                <AntDesign name='infocirlce' size={18} color={'rgba(0, 102, 0, 0.5)'} />
            </Pressable>
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
    aboutButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0, 102, 0, 0.1)'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#006600',
        backgroundColor: 'rgba(0, 102, 0, 0.1)'
    }
})