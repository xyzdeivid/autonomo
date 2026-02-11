import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

interface ConfirmDeleteProps {
    name: string
    deleteFunction: () => void
    setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConfirmDelete({ name, deleteFunction, setConfirmDelete }: ConfirmDeleteProps) {

    const theme = useGetTheme()

    return (
        <View style={styles.container}>
            <View style={{ ...styles.card, backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light }}>
                <Text style={{ ...styles.text, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>Tem certeza que deseja excluir {name}?</Text>
                <View style={styles.buttonsContainer}>
                    <Pressable
                        style={styles.cancelButton}
                        onPress={() => setConfirmDelete(false)}
                    >
                        <Text style={{ color: 'red' }}>Cancelar</Text>
                    </Pressable>
                    <Button
                        color='darkred'
                        title='Excluir'
                        onPress={() => deleteFunction()}
                    />
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
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    card: {
        padding: 16,
        borderRadius: 8,
        elevation: 4
    },
    text: {
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