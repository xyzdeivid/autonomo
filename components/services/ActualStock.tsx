import { View, Text, Pressable, StyleSheet } from "react-native";

interface ActualStockProps {
    stock: number
    setEditStockInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualStock({ stock, setEditStockInput }: ActualStockProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Estoque: </Text>
            <Text>{stock}</Text>
            <Pressable
                style={styles.editButton}
                onPress={() => setEditStockInput(true)}
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
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold'
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