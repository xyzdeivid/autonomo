import { moneyFormat } from '@/functions/common'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'

interface EditValueInputProps {
    newValue: number
    setNewValue: React.Dispatch<React.SetStateAction<number>>
    onSuccessButtonPress: () => Promise<void>
    onCancelButtonPress: () => void
    defaultValue: number
}

export function EditValueInput({ newValue, setNewValue, onSuccessButtonPress, defaultValue, onCancelButtonPress }: EditValueInputProps) {

    return (
        <View>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Valor:</Text>
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

                        setNewValue(Number(value))
                    }}
                />
                {
                    newValue && newValue !== defaultValue ? (
                        <Pressable
                            style={styles.button}
                            onPress={onSuccessButtonPress}
                        >
                            <Text style={{ color: 'white' }}>Salvar</Text>
                        </Pressable>
                    ): null
                }
                {
                    (!newValue || newValue === defaultValue) ? (
                        <Pressable
                            style={styles.cancelButton}
                            onPress={onCancelButtonPress}
                        >
                            <Text style={{ color: 'white' }}>Cancelar</Text>
                        </Pressable>
                    ): null
                }
            </View>
            <Text style={styles.currentValueText}>
                Valor atual: {moneyFormat(defaultValue)}
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
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },
    button: {
        backgroundColor: '#716fc4',
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    },
    currentValueText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 12
    },
    cancelButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    }
})