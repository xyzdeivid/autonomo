import { StyleSheet, TextInput, View } from 'react-native'
import { FormFieldContainer } from './FormFieldContainer'
import { Label } from './Label'

interface FormNameFieldProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    label: string
    labelBgColor: string
    inputBgColor: string
}

export function FormNameField({ setName, label, labelBgColor, inputBgColor }: FormNameFieldProps) {
    return (
        <FormFieldContainer>
                <View
                    style={{
                        ...styles.labelContainer,
                        backgroundColor: labelBgColor
                    }}
                >
                    <Label text={label} />
                </View>
                <TextInput
                    style={{
                        ...styles.input,
                        backgroundColor: inputBgColor
                    }}
                    onChangeText={text => setName(text.trim())}
                />
        </FormFieldContainer>
    )
}

const styles = StyleSheet.create({

    labelContainer: {
        fontSize: 16,
        paddingVertical: 6
    },

    input: {
        color: 'black',
        height: 40,
        textAlign: 'center'
    }

})