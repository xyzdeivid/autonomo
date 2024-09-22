import { StyleSheet, View, Text, TextInput } from 'react-native'

interface NameInputProps {
    setName: React.Dispatch<React.SetStateAction<string>>
}

export default function NameInput({ setName }: NameInputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={{ color: 'black' }}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={text => setName(text)} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    input: {
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E4E4',
        color: 'black',
        padding: 0,
        margin: 0
    }
})