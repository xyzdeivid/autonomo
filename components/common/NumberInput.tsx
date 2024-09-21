import { View, Text, TextInput, StyleSheet } from 'react-native'

interface NumberInputProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function NumberInput({ setValue }: NumberInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: 'black' }}>Valor:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={text => setValue(Number(text.replace(',', '.')))} />
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
        borderBottomColor: '#E5E4E4',
        color: 'black',
        padding: 0,
        margin: 0
    }
})