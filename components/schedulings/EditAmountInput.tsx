import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native'

interface EditAmountInputProps {
    actualAmount: number
    newAmount: number
    setNewAmount: React.Dispatch<React.SetStateAction<number>>
    setShowEditAmountInput: React.Dispatch<React.SetStateAction<boolean>>
    editAmount: () => void
}

export default function EditAmountInput({ actualAmount, newAmount, setNewAmount, setShowEditAmountInput, editAmount }: EditAmountInputProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Quantidade:</Text>
            <TextInput
                defaultValue={String(actualAmount)}
                style={styles.editInput}
                keyboardType='numeric'
                onChangeText={text => {
                    setNewAmount(Number(text))
                }}
            />
            <Pressable
                style={styles.editButton}
                onPress={() => {
                    if (!newAmount) {
                        setShowEditAmountInput(false)
                    } else {
                        editAmount()
                    }
                }}
            >
                <Text style={{ color: 'white' }}>Ok</Text>
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
    label: {
        fontWeight: 'bold'
    },
    editInput: {
        width: '20%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 4,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },
    editButton: {
        backgroundColor: 'blue',
        borderColor: 'darkblue',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})