import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, View, Text } from 'react-native'

export default function RevenueTitle() {

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Financeiro</Text>
            <FontAwesome6 name='money-bill-trend-up' size={24} color='darkgreen' />
        </View>
    )

}

const styles = StyleSheet.create({
    titleContainer: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 8
    },
    title: {
        fontSize: 24,
        backgroundColor: 'darkgreen',
        color: 'white',
        padding: 8,
    }
})