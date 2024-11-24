import { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface AmountInputProps {
    text: string
    setAmount: React.Dispatch<React.SetStateAction<number>>
    defaultValue?: number
    bgColor?: string
    textColor?: string
}

export default function AmountInput({ text, setAmount, defaultValue, bgColor, textColor }: AmountInputProps) {

    const [textValue, setTextValue] = useState('')

    const checkNumber = (text: string) => {
        if (/^\d+$/.test(text)) {
            setTextValue(text)
            setAmount(Number(text))
        } else {
            setTextValue(text.replace(/\D/g, ''))
        }
    }

    return (
        <View style={styles.inputContainer}>
            <Text
                style={{
                    color: textColor ? textColor : 'black',
                    fontWeight: 'bold'
                }}
            >
                {text}:
            </Text>
            <TextInput
                value={defaultValue ? String(defaultValue) : textValue}
                onChangeText={text => {
                    if (text) {
                        checkNumber(text)
                    } else {
                        setTextValue('')
                        setAmount(0)
                    }
                }}
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
        padding: 4,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})