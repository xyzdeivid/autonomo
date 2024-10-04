import { View, Text, TextInput, StyleSheet } from 'react-native'

interface AmountInputProps {
    setAmount: React.Dispatch<React.SetStateAction<number>>
}

export default function AmountInput({ setAmount }: AmountInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text>Quantidade:</Text>
            <TextInput onChangeText={text => setAmount(Number(text))} style={styles.input} keyboardType='numeric' />
        </View>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '25%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})