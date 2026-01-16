import { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Label } from './Label'
import { FormFieldContainer } from './FormFieldContainer'

interface FormAmountFieldProps {
    text: string
    setAmount: React.Dispatch<React.SetStateAction<number>>
    defaultValue?: number
    bgColor?: string
    textColor?: string
}

export function FormAmountField({ text, setAmount, defaultValue, bgColor, textColor }: FormAmountFieldProps) {

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
        <FormFieldContainer borderBottomColor={bgColor}>
            <Label text={text} color={textColor} />
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
        </FormFieldContainer>
    )

}

const styles = StyleSheet.create({

    input: {
        width: 60,
        color: 'black',
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }

})