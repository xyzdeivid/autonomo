import { TextInput, StyleSheet } from 'react-native'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'
import { EditCardContainer } from './EditCardContainer'
import { EditCardButtonsContainer } from './EditCardButtonsContainer'
import { useState } from 'react'
import { useGetTheme } from '@/hooks/common/useGetTheme'

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

    const theme = useGetTheme()

    const [newName, setNewName] = useState('')

    function ableToSave(): boolean {

        if (newName && newName !== currentName) return true

        return false

    }

    return (
        <EditCardContainer
            visible={visible}
            onCancelButtonPress={onCancelButtonPress}
            label='Novo Nome:'
        >
            <TextInput
                defaultValue={currentName}
                onChangeText={text => setNewName(text.trim())}
                style={{
                    ...styles.input,
                    backgroundColor: theme === 'dark' ? '#1E1D1D' : '#E0E0E0',
                    color: theme === 'dark' ? '#FFF' : '#000',
                }}
            />
            <EditCardButtonsContainer>
                <CancelEditButton
                    onCancelButtonPress={onCancelButtonPress}
                />
                <ConfirmEditButton
                    onPress={() => onConfirmButtonPress(newName)}
                    ableToSave={ableToSave()}
                />
            </EditCardButtonsContainer>
        </EditCardContainer>
    )
}

const styles = StyleSheet.create({

    input: {
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