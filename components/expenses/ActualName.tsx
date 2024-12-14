import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

interface ActualNameProps {
    name: string
    setShowEditNameInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualName({ name, setShowEditNameInput }: ActualNameProps) {

    const [items] = useContext(DocsContext).items

    const checkIfIsResale = () => {
        const product = items.find(current => current._id === name)
        return product
        ? false : true
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome: </Text>
            <Text>{name}</Text>
            {
                checkIfIsResale() ?
                <Pressable
                    style={styles.editButton}
                    onPress={() => setShowEditNameInput(true)}
                >
                    <Text>Editar</Text>
                </Pressable>
                : null
            }

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
        fontWeight: 'bold'
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})