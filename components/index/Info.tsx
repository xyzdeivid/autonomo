import { colors } from '@/styles/appColors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StyleSheet, Text, View } from 'react-native'

export function Info({ text }: { text: string }) {

    return (
        <View style={styles.container}>
            <FontAwesome name="circle" size={8} color="#000000" style={{ marginStart: 4 }} />
            <Text style={{ fontSize: 16, maxWidth: '95%' }}>{text}</Text>
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
        backgroundColor: colors.home.min,
        padding: 4,
        borderRadius: 8
    }

})