import { View, TextInput, StyleSheet, Modal, Text } from 'react-native'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'

interface EditNameCardProps {
    visible: boolean
    currentName: string
    newName: string
    setNewName: React.Dispatch<React.SetStateAction<string>>
    onConfirmButtonPress: () => void
    onCancelButtonPress: () => void
}

export function EditNameCard({
    visible,
    currentName,
    newName,
    setNewName,
    onConfirmButtonPress,
    onCancelButtonPress
}: EditNameCardProps) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={onCancelButtonPress}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text>Novo nome:</Text>
                    <TextInput
                        defaultValue={currentName}
                        onChangeText={text => setNewName(text.trim())}
                        style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                        {newName && newName !== currentName ? (
                            <ConfirmEditButton onPress={onConfirmButtonPress} />
                        ) : (
                            <CancelEditButton onCancelButtonPress={onCancelButtonPress} />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    card: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        elevation: 5
    },

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
