import { StyleSheet, TextInput } from 'react-native'
import { Label } from './Label'
import { FormFieldContainer } from './FormFieldContainer'

interface FormNameFieldProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    label?: string
    bgColor?: string
    textColor?: string
    defaultValue?: string
}

export function FormNameField({ setName, label, bgColor, textColor, defaultValue }: FormNameFieldProps) {
    return (
        <FormFieldContainer borderBottomColor={bgColor ? bgColor : ''}>
            <Label
                text={label || 'Nome:'}
                color={textColor}
            />
            <TextInput
                defaultValue={defaultValue}
                style={{
                    ...styles.input,
                    backgroundColor: bgColor ? bgColor : '#E0E0E0',
                    textAlign: 'center'
                }}
                onChangeText={text => setName(text.trim())}
            />
        </FormFieldContainer>
    )
}

const styles = StyleSheet.create({

    input: {
        flex: 1,
        color: 'black',
        borderRadius: 3,
        marginStart: 8
    }

})