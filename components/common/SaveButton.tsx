import { Pressable, StyleSheet, Text } from 'react-native'

interface SaveButtonProps {
    color: string
    onPress: () => Promise<void>
}

export default function SaveButton({ color, onPress }: SaveButtonProps) {

    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        marginTop: 12,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 6
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }

})