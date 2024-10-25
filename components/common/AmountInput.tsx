import { View, Text, TextInput, StyleSheet } from 'react-native'

interface AmountInputProps {
    text: string
    setAmount: React.Dispatch<React.SetStateAction<number>>
    defaultValue?: number
    bgColor?: string
    textColor?: string
}

export default function AmountInput({ text, setAmount, defaultValue, bgColor, textColor }: AmountInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: textColor ? textColor : 'black' }}>{text}:</Text>
            <TextInput
                value={defaultValue ? String(defaultValue) : undefined}
                onChangeText={text => setAmount(Number(text))}
                style={{
                    ...styles.input,
                    backgroundColor: bgColor ? bgColor : '#E0E0E0'
                }}
                keyboardType='numeric'
            />
        </View>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        width: '25%',
        color: 'black',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})