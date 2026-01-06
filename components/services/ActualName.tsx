import { View, Text, Pressable, StyleSheet } from 'react-native'

interface ActualNameProps {
    name: string
    setEditNameInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualName({ name, setEditNameInput }: ActualNameProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome: </Text>
            <Text style={{ fontSize: 16 }}>{name}</Text>
            <Pressable
                style={styles.editButton}
                onPress={() => setEditNameInput(true)}
            >
                <Text style={{ fontSize: 16 }}>Editar</Text>
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
        fontWeight: 'bold',
        fontSize: 16
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    }
})