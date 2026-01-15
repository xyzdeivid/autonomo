import { Pressable, StyleSheet, Text } from 'react-native'

interface CancelEditButtonProps {
    onCancelButtonPress: () => void
}

export function CancelEditButton({ onCancelButtonPress }: CancelEditButtonProps) {

    return (
        <Pressable
            style={styles.cancelButton}
            onPress={onCancelButtonPress}
        >
            <Text style={{ color: 'white' }}>Cancelar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    cancelButton: {
        backgroundColor: 'rgba(102, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    }

})