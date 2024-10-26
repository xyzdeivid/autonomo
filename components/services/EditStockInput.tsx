import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native'

interface EditStockInputProps {
    setStock: React.Dispatch<React.SetStateAction<number>>
    editStock: () => void
    setChangedValue: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditStockInput({ setStock, editStock, setChangedValue }: EditStockInputProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Estoque:</Text>
            <TextInput onChangeText={text => {
                setChangedValue(true)
                setStock(Number(text))
            }} style={styles.editInput} keyboardType='numeric' />
            <Pressable
                style={styles.editButton}
                onPress={() => editStock()}
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
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold'
    },
    editInput: {
        width: '25%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 0,
        margin: 0,
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