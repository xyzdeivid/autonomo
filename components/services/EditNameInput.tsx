import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native'

interface EditNameInputProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    editName: () => void
}

export default function EditNameInput({ setName, editName }: EditNameInputProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput onChangeText={text => setName(text.trim())} style={styles.editInput} />
            <Pressable
                style={styles.editButton}
                onPress={() => editName()}
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
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold'
    },
    editInput: {
        width: '50%',
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