import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

interface EditNameInputProps {
    defaultValue: string
    newName: string
    setNewName: React.Dispatch<React.SetStateAction<string>>
    onSuccessButtonPress: () => Promise<void>
    onCancelButtonPress: () => void
}

export function EditNameInput({ defaultValue, newName, setNewName, onSuccessButtonPress, onCancelButtonPress }: EditNameInputProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput defaultValue={defaultValue} onChangeText={text => setNewName(text.trim())} style={styles.input} />
            {
                newName && newName !== defaultValue && (
                    <Pressable
                        style={styles.button}
                        onPress={onSuccessButtonPress}
                    >
                        <Text style={{ color: 'white' }}>Salvar</Text>
                    </Pressable>
                )
            }
            {
                (!newName || newName === defaultValue) && (
                    <Pressable
                        style={styles.cancelButton}
                        onPress={onCancelButtonPress}
                    >
                        <Text style={{ color: 'white' }}>Cancelar</Text>
                    </Pressable>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16
    },

    button: {
        backgroundColor: '#716fc4',
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    },

    input: {
        width: '50%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },

    cancelButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    }

})