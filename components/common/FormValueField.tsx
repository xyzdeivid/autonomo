import { StyleSheet, Text, View } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { Label } from './Label'
import ValueOption from './ValueOption'
import { FormFieldContainer } from './FormFieldContainer'

interface FormValueFieldProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    label: string
    labelBgColor: string
    inputBgColor: string
    valueChoice?: string
    setValueChoice?: React.Dispatch<React.SetStateAction<string>>
    valueChoiceButtonColors?: [string, string]
}

export function FormValueField({ setValue, label, labelBgColor, inputBgColor, valueChoice, setValueChoice, valueChoiceButtonColors }: FormValueFieldProps) {

    return (
        <FormFieldContainer>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View
                    style={{...styles.labelContainer, backgroundColor: labelBgColor}}
                    >
                        <Label text={label}/>
                    </View>
                    <MaskedTextInput
                        type='currency'
                        options={{
                            decimalSeparator: ',',
                            groupSeparator: '.',
                            precision: 2
                        }}
                        style={{
                            ...styles.input,
                            backgroundColor: inputBgColor
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
                            <Text style={{ marginStart: 8, flex: 1 }}>
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

    labelContainer: {
        justifyContent: 'center'
    },

    input: {
        width: 80,
        height: 40,
        color: 'black',
        textAlign: 'center',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },

    valueChoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

})