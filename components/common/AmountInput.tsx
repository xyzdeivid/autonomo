import { View, Text, TextInput, StyleSheet } from 'react-native'

interface AmountInputProps {
    text: string
    setAmount: React.Dispatch<React.SetStateAction<number>>
    defaultValue?: number
}

export default function AmountInput({ text, setAmount, defaultValue }: AmountInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text>{text}:</Text>
            <TextInput value={defaultValue ? String(defaultValue) : undefined} onChangeText={text => setAmount(Number(text))} style={styles.input} keyboardType='numeric' />
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