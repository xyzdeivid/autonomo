import { View, Text, TextInput, StyleSheet } from 'react-native'

interface NumberInputProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function NumberInput({ setValue }: NumberInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: 'white' }}>Valor:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setValue(Number(text))} />
        </View>
    )

}

const styles = StyleSheet.create({
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
    }
})