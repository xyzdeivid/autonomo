import { StyleSheet, TextInput, View } from 'react-native'
import { FormFieldContainer } from './FormFieldContainer'
import { Label } from './Label'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface FormNameFieldProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    label: string
    labelBgColor: string
    inputBgColor: string
}

export function FormNameField({ setName, label, labelBgColor, inputBgColor }: FormNameFieldProps) {

    const theme = useGetTheme()

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
                        color: theme === 'dark' ? '#FFF' : '#000',
                        backgroundColor: inputBgColor
                    }}
                    underlineColorAndroid='transparent'
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
        height: 40,
        textAlign: 'center',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    }

})