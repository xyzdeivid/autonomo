import { StyleSheet, View } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { EditCardContainer } from './EditCardContainer'
import { EditCardButtonsContainer } from './EditCardButtonsContainer'
import { useState } from 'react'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface EditValueInputProps {
    visible: boolean
    currentValue: number
    onSuccessButtonPress: (newValue: number) => void
    onCancelButtonPress: () => void
}

export function EditValueCard({ visible, currentValue, onSuccessButtonPress, onCancelButtonPress }: EditValueInputProps) {

    const theme = useGetTheme()

    const [newValue, setNewValue] = useState(0)

    function ableToSave(): boolean {

        if (newValue && newValue !== currentValue) return true

        return false

    }

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
                    style={{
                        ...styles.editInput
                        ,
                        backgroundColor: theme === 'dark' ? '#1E1D1D' : '#E0E0E0',
                        color: theme === 'dark' ? '#FFF' : '#000',
                    }}
                    keyboardType='numeric'
                    onChangeText={text => {
                        // Removendo pontos e vírgulas do valor
                        const cleaned = text
                            .replace(/[^\d,]/g, '')
                            .replace(',', '.')
                        const numericValue = Number(cleaned)
                        setNewValue(Number.isFinite(numericValue) ? numericValue : 0)
                    }}
                />
                <EditCardButtonsContainer>
                    <CancelEditButton
                        onCancelButtonPress={onCancelButtonPress}
                    />
                    <ConfirmEditButton
                        onPress={() => onSuccessButtonPress(newValue)}
                        ableToSave={ableToSave()}
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