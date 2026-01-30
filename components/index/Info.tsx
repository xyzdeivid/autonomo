import { colors } from '@/styles/appColors'
import { StyleSheet, Text } from 'react-native'

export function Info({ text }: { text: string }) {

    return (
            <Text style={styles.text}>{text}</Text>
    )

}

const styles = StyleSheet.create({

    text: {
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: colors.home.max,
        color: '#FFF',
        padding: 4,
        marginTop: 12,
        marginBottom: 16,
        borderRadius: 4
    }

})