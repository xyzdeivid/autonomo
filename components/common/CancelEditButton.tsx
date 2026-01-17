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
            <Text style={{ color: 'darkred' }}>Cancelar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    cancelButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#6600001a'
    }

})