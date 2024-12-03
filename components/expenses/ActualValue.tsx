import { DocsContext } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

interface ActualValueProps {
    name: string
    value: number
    setShowEditValueInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualValue({ name, value, setShowEditValueInput }: ActualValueProps) {

    const [items] = useContext(DocsContext).services

    const checkIfIsResale = () => {
        const product = items.find(current => current._id === name)
        return product
            ? false : true
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}>Valor:</Text>
            <Text>{moneyFormat(value)}</Text>
            {
                checkIfIsResale() &&
                <Pressable
                    style={styles.editButton}
                    onPress={() => setShowEditValueInput(true)}
                >
                    <Text>Editar</Text>
                </Pressable>
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
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})