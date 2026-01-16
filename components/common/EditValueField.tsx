import { moneyFormat } from '@/functions/common'
import { StyleSheet, View, Text } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { Label } from './Label'

interface EditValueInputProps {
    newValue: number
    setNewValue: React.Dispatch<React.SetStateAction<number>>
    onSuccessButtonPress: () => Promise<void>
    onCancelButtonPress: () => void
    defaultValue: number
}

export function EditValueField({ newValue, setNewValue, onSuccessButtonPress, defaultValue, onCancelButtonPress }: EditValueInputProps) {

    return (
        <View>
            <View style={styles.container}>
                <Label text='Valor:' />
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
                        <ConfirmEditButton
                            onPress={onSuccessButtonPress}
                        />
                    ) : null
                }
                {
                    (!newValue || newValue === defaultValue) ? (
                        <CancelEditButton
                            onCancelButtonPress={onCancelButtonPress}
                        />
                    ) : null
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

    currentValueText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 12
    }

})