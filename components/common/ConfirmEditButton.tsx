import { Pressable, StyleSheet, Text } from 'react-native'

interface ConfirmEditButtonProps {
    onPress: () => void
}

export function ConfirmEditButton({ onPress }: ConfirmEditButtonProps) {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={{ color: 'white' }}>Salvar</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    }

})