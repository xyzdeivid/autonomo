import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm }: AddServiceFormProps) {

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white' }}>Nome:</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white' }}>Valor:</Text>
                <TextInput style={styles.input} keyboardType='numeric' />
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={() => setAddServiceForm(false)} style={styles.button}>
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
        borderBottomWidth: 0.5,
        borderBottomColor: 'white'
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