import { View, Text, TextInput, StyleSheet } from 'react-native'
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
                    decimalSeparator: '.',
                    groupSeparator: ',',
                    precision: 2
                }}
                style={styles.input}
                keyboardType='numeric'
                onChangeText={text => setValue(Number(text))}
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
        backgroundColor: '#E5E4E4',
        color: 'black',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})