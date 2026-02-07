import { Pressable, StyleSheet, Text } from 'react-native'

export function CloseCardButton({ onPress }: { onPress: () => void }) {

    return (
        <Pressable
            onPress={onPress}
            style={styles.button}
        >
            <Text style={styles.text}>Fechar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        padding: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#A1A1A1',
        borderRadius: 4
    },

    text: {
        color: '#A1A1A1'
    }

})