import { FontAwesome6 } from '@expo/vector-icons'
import { Pressable, StyleSheet, View, Text } from 'react-native'

interface DeleteListItemButtonProps {
    onPress: () => void
}

export function DeleteListItemButton({ onPress }: DeleteListItemButtonProps) {

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.button}>
                <FontAwesome6 name='trash' color='darkred' size={16}/>
                <Text style={styles.text}>Excluir</Text>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 2,
        alignSelf: 'center',
        padding: 10,
        paddingStart: 0,
        marginBottom: 12
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    text: {
        marginStart: 4,
        color: 'darkred',
        fontWeight: '600'
    }

})