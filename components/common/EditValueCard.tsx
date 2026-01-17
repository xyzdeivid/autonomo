import { StyleSheet, View } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { EditCardContainer } from './EditCardContainer'
import { EditCardButtonsContainer } from './EditCardButtonsContainer'

interface EditValueInputProps {
    visible: boolean
    setNewValue: React.Dispatch<React.SetStateAction<number>>
    onSuccessButtonPress: () => void
    onCancelButtonPress: () => void
}

export function EditValueCard({ visible, setNewValue, onSuccessButtonPress, onCancelButtonPress }: EditValueInputProps) {

    return (
        <EditCardContainer
            visible={visible}
            onCancelButtonPress={onCancelButtonPress}
            label='Novo Valor:'
        >
            <View style={styles.container}>
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
                <EditCardButtonsContainer>
                    <CancelEditButton
                        onCancelButtonPress={onCancelButtonPress}
                    />
                    <ConfirmEditButton
                        onPress={onSuccessButtonPress}
                    />
                </EditCardButtonsContainer>
            </View>
        </EditCardContainer>
    )

}

const styles = StyleSheet.create({

    container: {
    },

    editInput: {
        width: '25%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 8,
        textAlign: 'center',
        borderRadius: 3

    },

    currentValueText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 12
    }

})