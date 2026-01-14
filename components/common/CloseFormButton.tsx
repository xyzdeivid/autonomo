import { Pressable, StyleSheet, View, Text } from 'react-native'

interface CloseFormButtonProps {
    onCloseFormButtonPress: () => void
}

export function CloseFormButton({ onCloseFormButtonPress }: CloseFormButtonProps) {

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={onCloseFormButtonPress}
            >
                <Text style={styles.buttonText}>Fechar Formulário</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center'
    },

    button: {
        padding: 8,
        borderRadius: 4,
        marginStart: 8,
        marginBottom: 8,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },

    buttonText: {
        color: '#00000090'
    }

})