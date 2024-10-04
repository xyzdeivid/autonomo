import { Alert, Pressable, StyleSheet } from 'react-native'

import { Entypo } from '@expo/vector-icons'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

interface AddSchedulingButtonProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingButton({ setAddSchedulingForm }: AddSchedulingButtonProps) {

    const [services] = useContext(DocsContext).services

    const checkServices = () => {
        services[0]
            ? setAddSchedulingForm(true)
            : Alert.alert('Sem serviço disponível', 'Você precisa ter um serviço registrado para cadastrar um agendamento')
    }

    return (
        <Pressable onPress={() => checkServices()} style={{ ...styles.button, backgroundColor: '#004AAD' }}>
            <Entypo name='add-to-list' size={24} color='white' />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        padding: 6,
        alignSelf: 'flex-start',
        marginStart: 10,
        borderRadius: 3
    }
})