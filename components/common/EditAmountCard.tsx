import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { EditCardContainer } from './EditCardContainer'
import { EditCardButtonsContainer } from './EditCardButtonsContainer'

interface EditAmountCardProps {
    visible: boolean
    currentValue: number
    onSuccessButtonPress: (newAmount: number) => void
    onCancelButtonPress: () => void
}

export function EditAmountCard({
    visible,
    currentValue,
    onSuccessButtonPress,
    onCancelButtonPress
}: EditAmountCardProps) {

    const [textValue, setTextValue] = useState(String(currentValue))

    const handleChangeText = (text: string) => {

        // aceita apenas números
        const onlyNumbers = text.replace(/\D/g, '')
        setTextValue(onlyNumbers)

    }

    return (
        <EditCardContainer
            visible={visible}
            onCancelButtonPress={onCancelButtonPress}
            label="Nova Quantidade:"
        >
            <TextInput
                value={textValue}
                onChangeText={handleChangeText}
                style={styles.editInput}
                keyboardType="numeric"
            />

            <EditCardButtonsContainer>
                <CancelEditButton onCancelButtonPress={onCancelButtonPress} />
                {textValue && Number(textValue) !== currentValue ?
                    <ConfirmEditButton onPress={() => onSuccessButtonPress(Number(textValue))} /> : null}
            </EditCardButtonsContainer>
        </EditCardContainer>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    editInput: {
        width: 60,
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 8,
        textAlign: 'center',
        borderRadius: 3

    },
    editButton: {
        backgroundColor: 'blue',
        borderColor: 'darkblue',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})