import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useContext, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

import { DocsContext } from '@/context/DocsContext'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [, setServices] = useContext(DocsContext).services

    function addService() {

        const service = {
            _id: name, value
        }

        setServices(services => [...services, service])

        setAddServiceForm(false)

    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white' }}>Nome:</Text>
                <TextInput style={styles.input} onChangeText={text => setName(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white' }}>Valor:</Text>
                <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setValue(Number(text))} />
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={() => addService()} style={styles.button}>
                    <Text style={{ color: 'white' }}>Cadastrar</Text>
                </Pressable>
                <Pressable onPress={() => setAddServiceForm(false)} style={styles.button}>
                    <AntDesign name='close' size={24} color='white' />
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D3D',
        padding: 10
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    input: {
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white',
        padding: 0,
        margin: 0
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        color: 'white',
        padding: 4
    }
})