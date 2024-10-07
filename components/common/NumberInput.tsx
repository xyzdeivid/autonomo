import { View, Text, StyleSheet } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'

interface NumberInputProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function NumberInput({ setValue }: NumberInputProps) {

    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: 'black' }}>Valor:</Text>
            <MaskedTextInput
                type='currency'
                options={{
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 2
                }}
                style={styles.input}
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
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})