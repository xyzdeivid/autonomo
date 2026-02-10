import { useState } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { FormFieldContainer } from './FormFieldContainer'
import { Label } from './Label'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface FormAmountFieldProps {
    setAmount: React.Dispatch<React.SetStateAction<number>>
    label: string
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
}

export function FormAmountField({ setAmount, label, labelBgColor, inputBgColor, inputBorderColor }: FormAmountFieldProps) {

    const theme = useGetTheme()

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
        <FormFieldContainer>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    ...styles.labelContainer,
                    backgroundColor: labelBgColor
                }}>
                    <Label text={label} />
                </View>
                <TextInput
                    value={textValue}
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
                        color: theme === 'dark' ? '#FFF' : '#000',
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor
                    }}
                    keyboardType='numeric'
                />
            </View>
        </FormFieldContainer>
    )

}

const styles = StyleSheet.create({

    labelContainer: {
        justifyContent: 'center',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },

    input: {
        width: 80,
        height: 40,
        textAlign: 'center',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderWidth: 2,
        borderLeftWidth: 0
    }

})