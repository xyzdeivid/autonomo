import { StyleSheet, Text, View } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { Label } from './Label'
import ValueOption from './ValueOption'
import { FormFieldContainer } from './FormFieldContainer'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface FormValueFieldProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    label: string
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
    valueChoice?: string
    setValueChoice?: React.Dispatch<React.SetStateAction<string>>
    valueChoiceButtonColors?: [string, string]
}

export function FormValueField({ setValue, label, labelBgColor, inputBgColor, inputBorderColor, valueChoice, setValueChoice, valueChoiceButtonColors }: FormValueFieldProps) {

    const theme = useGetTheme()

    return (
        <FormFieldContainer>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View
                    style={{
                        ...styles.labelContainer, 
                        backgroundColor: labelBgColor,
                        borderBottomLeftRadius: !valueChoice ? 6 : 0
                    }}
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
                            color: theme === 'dark' ? '#FFF' : '#000',
                            backgroundColor: inputBgColor,
                            borderColor: inputBorderColor
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
        justifyContent: 'center',
        borderTopLeftRadius: 6
    },

    input: {
        width: 80,
        height: 40,
        textAlign: 'center',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderWidth: 2,
        borderLeftWidth: 0
    },

    valueChoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

})