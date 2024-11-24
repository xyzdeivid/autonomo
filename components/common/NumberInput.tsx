import { View, Text, StyleSheet } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'

interface NumberInputProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    label?: string
    bgColor?: string
    textColor?: string
}

export default function NumberInput({ setValue, label, bgColor, textColor }: NumberInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text style={{
                color: textColor ? textColor : 'black',
                fontWeight: 'bold'
            }}>
                {label ? label : 'Valor'}:
            </Text>
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
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        width: '25%',
        color: 'black',
        padding: 4,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})