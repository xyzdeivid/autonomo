import { Pressable, StyleSheet, Text } from 'react-native'

interface SubmitItemButtonProps {
    submitItem: () => Promise<void>
}

export default function SubmitItemButton({ submitItem }: SubmitItemButtonProps) {

    return (
        <Pressable
            style={styles.button}
            onPress={submitItem}
        >
            <Text style={styles.buttonText}>Confirmar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#330066',
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