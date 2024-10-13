import { StyleSheet, View, Text, TextInput } from 'react-native'

interface NameInputProps {
    setName: React.Dispatch<React.SetStateAction<string>>
}

export default function NameInput({ setName }: NameInputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: 'black' }}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={text => setName(text.trim())} />
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
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 0,
        margin: 0,
        borderRadius: 3,
        width: '70%',
        marginStart: 8,
        paddingHorizontal: 8
    }
})