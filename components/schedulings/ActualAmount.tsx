import { View, Text, StyleSheet } from 'react-native'

interface ActualAmountProps {
    amount: number
}

export default function ActualAmount({ amount }: ActualAmountProps) {

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Quantidade:</Text>
            <Text style={{ fontSize: 16 }}> {amount}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    }
})