import { View, Text, StyleSheet, Pressable } from 'react-native'

interface ActualAmountProps {
    amount: number
    setShowEditAmountInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualAmount({ amount, setShowEditAmountInput }: ActualAmountProps) {

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text>
            <Text> {amount}</Text>
            <Pressable
                style={styles.editButton}
                onPress={() => setShowEditAmountInput(true)}
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