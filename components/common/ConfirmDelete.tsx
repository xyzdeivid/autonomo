import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

interface ConfirmDeleteProps {
    name: string
    deleteFunction: () => void
    setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConfirmDelete({ name, deleteFunction, setConfirmDelete }: ConfirmDeleteProps) {

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>Tem certeza que deseja excluir {name}?</Text>
                <View style={styles.buttonsContainer}>
                    <Button
                        color='darkred'
                        title='Excluir'
                        onPress={() => deleteFunction()}
                    />
                    <Pressable
                        style={styles.cancelButton}
                        onPress={() => setConfirmDelete(false)}
                    >
                        <Text style={{ color: 'darkred' }}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        elevation: 4
    },
    text: {
        backgroundColor: '#E0E0E0',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginBottom: 6
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        alignItems: 'center'
    },
    cancelButton: {
        marginStart: 12
    }
})