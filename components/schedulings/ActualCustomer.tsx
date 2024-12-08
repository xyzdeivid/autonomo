import { View, Text, StyleSheet, Pressable } from 'react-native'

interface ActualCustomerProps {
    customer: string
}

export default function ActualCustomer({ customer }: ActualCustomerProps) {

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}>Cliente:</Text>
            <Text> {customer}</Text>
            <Pressable
                style={styles.editButton}
            >
                <Text>Editar</Text>
            </Pressable>
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
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})