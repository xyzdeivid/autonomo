import { TextInput, StyleSheet } from 'react-native'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { EditCardContainer } from './EditCardContainer'
import { EditCardButtonsContainer } from './EditCardButtonsContainer'
import { useState } from 'react'

interface EditNameCardProps {
    visible: boolean
    currentName: string
    onConfirmButtonPress: (newName: string) => void
    onCancelButtonPress: () => void
}

export function EditNameCard({
    visible,
    currentName,
    onConfirmButtonPress,
    onCancelButtonPress
}: EditNameCardProps) {

    const [newName, setNewName] = useState('')

    return (
        <EditCardContainer
            visible={visible}
            onCancelButtonPress={onCancelButtonPress}
            label='Novo Nome:'
        >
            <TextInput
                defaultValue={currentName}
                onChangeText={text => setNewName(text.trim())}
                style={styles.input}
            />
            <EditCardButtonsContainer>
                <CancelEditButton
                    onCancelButtonPress={onCancelButtonPress}
                />
                {
                    newName && newName !== currentName && (
                        <ConfirmEditButton
                            onPress={() => onConfirmButtonPress(newName)}
                        />
                    )
                }
            </EditCardButtonsContainer>
        </EditCardContainer>
    )
}

const styles = StyleSheet.create({

    input: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        marginTop: 8,
        borderRadius: 4,
        textAlign: 'center'
    },

    buttonContainer: {
        marginTop: 12,
        alignItems: 'flex-end'
    }

})