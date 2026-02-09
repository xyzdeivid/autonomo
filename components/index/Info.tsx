import { colors } from '@/styles/appColors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StyleSheet, Text, View } from 'react-native'
import { CurrentMonthCard } from '../common/CurrentMonthCard'

export function Info({ text }: { text: string }) {

    return (
        <>
            <CurrentMonthCard />
            <View style={styles.container}>
                <FontAwesome name="info-circle" size={16} color="#000000C8" style={{ marginEnd: 4 }} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    currentMonth: {
        marginBottom: 12,
        backgroundColor: '#9D9C9C1A',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        textAlign: 'center'
    },

    container: {
        marginBottom: 12,
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