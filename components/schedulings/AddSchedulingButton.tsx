import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'

import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { getServices } from '@/functions/schedulings'

interface AddSchedulingButtonProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingButton({ setAddSchedulingForm }: AddSchedulingButtonProps) {

    const [services] = useContext(DocsContext).items

    const checkServices = () => {
        if (getServices(services)[0]) {
            setAddSchedulingForm(true)
        } else {
            Alert.alert('Sem produto ou serviço disponível', 'Verifique se você tem algum produto ou serviço registrado. Caso tenha produto, verifique se tem estoque disponível.')
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => {
                    checkServices()
                }}
            >
                <Text style={{ color: '#006600' }}>Registrar Receita</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        marginBottom: 16
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#006600',
        borderRadius: 5,
        backgroundColor: 'rgba(0, 102, 0, 0.1)'
    }
})