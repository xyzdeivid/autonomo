import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, Pressable, Text } from 'react-native'

interface AddItemFormProps {
    setAddItemsForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddItemForm({ setAddItemsForm }: AddItemFormProps) {

    const closeForm = (element: string) => {
        if (element !== 'button-container')
            setAddItemsForm(false)
    }

    return (
        <Pressable
            style={styles.container}
            onPress={() => closeForm('container')}
        >
            <Pressable
                style={styles.buttonsContainer}
                onPress={() => closeForm('button-container')}
            >
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Nova Entrada</Text>
                    <FontAwesome6 name='arrow-trend-up' size={16} color='#000000' />
                </Pressable>
                <Pressable style={{ ...styles.button, marginVertical: 8 }}>
                    <Text style={styles.text}>Nova Saída</Text>
                    <FontAwesome6 name='arrow-trend-down' size={16} color='#000000' />
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Novo Item</Text>
                    <FontAwesome6 name='bag-shopping' size={16} color='#000000' />
                </Pressable>
            </Pressable>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        backgroundColor: 'rgba(17, 41, 53, 0.5)',
        padding: 10,
        borderRadius: 10
    },
    button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        marginEnd: 8,
    }
})