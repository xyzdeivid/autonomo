import { Pressable, StyleSheet, Text } from 'react-native'

interface CloseFormButtonProps {
    onPress: () => void
}

export function CloseFormButton({ onPress }: CloseFormButtonProps) {

    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>FECHAR</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        padding: 8,
        borderRadius: 4,
        marginStart: 8,
        marginBottom: 8,
        backgroundColor: 'rgba(0,0,0,0.1)',
        position: 'absolute',
        bottom: 0,
        left: 0
    },

    buttonText: {
        color: '#00000090'
    }

})