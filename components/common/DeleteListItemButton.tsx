import { useGetTheme } from '@/hooks/common/useGetTheme'
import { FontAwesome6 } from '@expo/vector-icons'
import { Pressable, StyleSheet, View, Text } from 'react-native'

interface DeleteListItemButtonProps {
    onPress: () => void
}

export function DeleteListItemButton({ onPress }: DeleteListItemButtonProps) {

    const theme = useGetTheme()

    return (
        <Pressable 
        onPress={onPress} 
        style={{
            ...styles.container,
            backgroundColor: theme === 'dark' ? '#FFF': 'transparent'
        }}
        >
            <View style={styles.button}>
                <FontAwesome6 name='trash' color='darkred' size={16}/>
                <Text style={styles.text}>Excluir</Text>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    container: {
        alignSelf: 'center',
        padding: 4,
        borderRadius: 4
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