import { View, Text, StyleSheet } from 'react-native'

interface StockInfoProps {
    amount: number
}

export default function StockInfo({ amount }: StockInfoProps) {

    return (
        <View style={styles.container}>
            <Text>Estoque: {amount}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginTop: -10
    }
})