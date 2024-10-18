import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

interface ConfirmDeleteProps {
    deleteFunction: () => void
    setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConfirmDelete({ deleteFunction, setConfirmDelete }: ConfirmDeleteProps) {

    return (
        <View style={styles.container}>
            <Text>Tem certeza que deseja excluir?</Text>
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
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center'
    },
    cancelButton: {
        marginStart: 12
    }
})