import { Pressable, StyleSheet, Text } from 'react-native'

interface ConfirmEditButtonProps {
    onSuccessButtonPress: () => Promise<void>
}

export function ConfirmEditButton({ onSuccessButtonPress }: ConfirmEditButtonProps) {
    return (
        <Pressable
            style={styles.button}
            onPress={onSuccessButtonPress}
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