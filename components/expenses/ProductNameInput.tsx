import { StyleSheet, View, Text, TextInput } from 'react-native'

interface ProductNameInputProps {
    setProductName: React.Dispatch<React.SetStateAction<string>>
}

export default function ProductNameInput({ setProductName }: ProductNameInputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: 'black' }}>Nome do Produto:</Text>
            <TextInput style={styles.input} onChangeText={text => setProductName(text.trim())} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative'
    },
    input: {
        backgroundColor: 'rgba(102, 0, 0, 0.1)',
        color: 'black',
        padding: 0,
        margin: 0,
        borderRadius: 3,
        width: '55%',
        marginStart: 8,
        paddingHorizontal: 8
    }
})