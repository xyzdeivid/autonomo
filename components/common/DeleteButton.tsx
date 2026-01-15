import { Pressable, StyleSheet, Text } from 'react-native'

interface DeleteButtonProps {
    onPress: () => void
}

export function DeleteButton({ onPress }: DeleteButtonProps) {

    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={{ color: 'white' }}>EXCLUIR</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        backgroundColor: 'rgba(143, 2, 2, 0.5)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 4,
        marginEnd: 8,
        marginBottom: 8,
        position: 'absolute',
        bottom: 0,
        right: 0
    }

})