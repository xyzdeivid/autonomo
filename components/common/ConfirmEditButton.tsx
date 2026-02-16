import { Pressable, StyleSheet, Text } from 'react-native'

interface ConfirmEditButtonProps {
    onPress: () => void
    ableToSave: boolean
}

export function ConfirmEditButton({ onPress, ableToSave }: ConfirmEditButtonProps) {
    return (
        <Pressable
            style={{
                ...styles.button,
                backgroundColor: ableToSave ? '#5764EF' : 'gray'
            }}
            onPress={() => { if (ableToSave) onPress() }}
        >
            <Text style={{ color: 'white' }}>Salvar</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    button: {
        padding: 8,
        borderRadius: 4
    }

})