import { moneyFormat } from '@/functions/common'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'

interface EditValueInputProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    editValue: () => void
    actualValue: number
}

export default function EditValueInput({ setValue, editValue, actualValue }: EditValueInputProps) {

    return (
        <View>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold' }}>Valor:</Text>
                <MaskedTextInput
                    type='currency'
                    options={{
                        decimalSeparator: ',',
                        groupSeparator: '.',
                        precision: 2
                    }}
                    style={styles.editInput}
                    keyboardType='numeric'
                    onChangeText={text => {
                        // Removendo pontos e vírgulas do valor
                        let value = text.replace(',', '.')
                            .replace(/\.(?=.*\.)/g, '')

                        setValue(Number(value))
                    }}
                />
                <Pressable
                    style={styles.editButton}
                    onPress={() => editValue()}
                >
                    <Text style={{ color: 'white' }}>Ok</Text>
                </Pressable>
            </View>
            <Text style={styles.currentValueText}>
                Valor atual: {moneyFormat(actualValue)}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    editInput: {
        width: '25%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 4,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },
    editButton: {
        backgroundColor: 'blue',
        borderColor: 'darkblue',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    },
    currentValueText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 12
    }
})