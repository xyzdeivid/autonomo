import { colors } from '@/styles/appColors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StyleSheet, Text, View } from 'react-native'

export function Info({ text }: { text: string }) {

    return (
        <View style={styles.container}>
            <FontAwesome name="info-circle" size={16} color="#000000C8" style={{ marginEnd: 4 }} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 12,
        marginBottom: 24,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        backgroundColor: colors.home.midMin,
        padding: 8,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.home.mid
    },

    text: {
        fontSize: 16,
        maxWidth: '95%',
        fontWeight: '500',
        color: '#000000C8'
    }

})