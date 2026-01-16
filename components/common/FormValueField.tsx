import { StyleSheet, Text, View } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { Label } from './Label'
import ValueOption from './ValueOption'
import { FormFieldContainer } from './FormFieldContainer'

interface FormValueFieldProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    label?: string
    bgColor?: string
    textColor?: string
    valueChoice?: string
    setValueChoice?: React.Dispatch<React.SetStateAction<string>>
    valueChoiceButtonColors?: [string, string]
}

export function FormValueField({ setValue, label, bgColor, textColor, valueChoice, setValueChoice, valueChoiceButtonColors }: FormValueFieldProps) {

    return (
        <FormFieldContainer borderBottomColor={bgColor}>
            <View style={{ flex: 1 }}>
                <View style={styles.inputFieldContainer}>
                    <Label text={label ? label : 'Valor:'} color={textColor} />
                    <MaskedTextInput
                        type='currency'
                        options={{
                            decimalSeparator: ',',
                            groupSeparator: '.',
                            precision: 2
                        }}
                        style={{
                            ...styles.input,
                            backgroundColor: bgColor ? bgColor : '#E0E0E0'
                        }}
                        keyboardType='numeric'
                        onChangeText={text => {
                            // Removendo pontos e vírgulas do valor
                            let value = text.replace(',', '.')
                                .replace(/\.(?=.*\.)/g, '')
                            setValue(Number(value))
                        }}
                    />
                </View>
                {
                    valueChoice && setValueChoice && valueChoiceButtonColors && (
                        <View style={styles.valueChoiceContainer}>
                            <ValueOption
                                choice={valueChoice}
                                setChoice={setValueChoice}
                                buttonColors={valueChoiceButtonColors}
                            />
                            <Text style={{ color: textColor, marginStart: 8, flex: 1 }}>
                                {valueChoice === 'total'
                                    ? 'Valor de todas as unidades compradas'
                                    : 'Valor de cada unidade comprada'
                                }
                            </Text>
                        </View>
                    )
                }
            </View>
        </FormFieldContainer>

    )

}

const styles = StyleSheet.create({

    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    input: {
        width: 80,
        color: 'black',
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    },

    valueChoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        flexWrap: 'wrap'
    }

})