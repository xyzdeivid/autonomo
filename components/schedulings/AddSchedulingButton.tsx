import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { getServices } from '@/functions/schedulings'

interface AddSchedulingButtonProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingButton({ setAddSchedulingForm }: AddSchedulingButtonProps) {

    const [services] = useContext(DocsContext).services

    const checkServices = () => {
        getServices(services)[0]
            ? setAddSchedulingForm(true)
            : Alert.alert('Sem item disponível', 'Verifique se você tem algum item ou estoque disponível.')
    }

    return (
        <Pressable
            style={styles.buttonContainer}
            onPress={() => checkServices()}
        >
            <Text style={{ color: 'white' }}>Nova Entrada</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#006600'
    }
})