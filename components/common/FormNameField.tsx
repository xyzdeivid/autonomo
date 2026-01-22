import { StyleSheet, TextInput, View } from 'react-native'
import { FormFieldContainer } from './FormFieldContainer'
import { Label } from './Label'

interface FormNameFieldProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    label: string
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
}

export function FormNameField({ setName, label, labelBgColor, inputBgColor, inputBorderColor }: FormNameFieldProps) {
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
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor
                    }}
                    onChangeText={text => setName(text.trim())}
                />
        </FormFieldContainer>
    )
}

const styles = StyleSheet.create({

    labelContainer: {
        fontSize: 16,
        paddingVertical: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },

    input: {
        color: 'black',
        height: 40,
        textAlign: 'center',
        borderWidth: 2,
        borderTopWidth: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    }

})