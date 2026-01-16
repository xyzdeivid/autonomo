import { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { Label } from './Label'

interface EditAmountFieldProps {
    setAmount: React.Dispatch<React.SetStateAction<number>>
    onSuccessButtonPress: () => Promise<void>
    defaultValue: number
    onCancelButtonPress: () => void
}

export function EditAmountField({ setAmount, onSuccessButtonPress, defaultValue, onCancelButtonPress }: EditAmountFieldProps) {

    const [textValue, setTextValue] = useState(String(defaultValue))

    const checkNumber = (text: string) => {

        if (/^\d+$/.test(text)) {

            setTextValue(text)
            setAmount(Number(text))

        } else {

            setTextValue(text.replace(/\D/g, ''))

        }

    }

    return (
        <View style={styles.container}>
            <Label text='Estoque:' />
            <TextInput
                value={textValue}
                onChangeText={text => checkNumber(text)}
                style={styles.editInput}
                keyboardType='numeric'
            />
            {
                textValue && textValue !== String(defaultValue) && (
                    <ConfirmEditButton
                        onPress={onSuccessButtonPress}
                    />
                )
            }
            {
                (!textValue || textValue === String(defaultValue)) && (
                    <CancelEditButton onCancelButtonPress={onCancelButtonPress} />
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    editInput: {
        width: '20%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },
    editButton: {
        backgroundColor: 'blue',
        borderColor: 'darkblue',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})