import { useState } from 'react'
import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native'

interface EditStockInputProps {
    setStock: React.Dispatch<React.SetStateAction<number>>
    editStock: () => void
    setChangedValue: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditStockInput({ setStock, editStock, setChangedValue }: EditStockInputProps) {

    const [textValue, setTextValue] = useState('')

    const checkNumber = (text: string) => {
        if (/^\d+$/.test(text)) {
            setTextValue(text)
            setStock(Number(text))
        } else {
            setTextValue(text.replace(/\D/g, ''))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Estoque:</Text>
            <TextInput
                value={textValue}
                onChangeText={text => {
                    if (text.length > 0) {
                        setChangedValue(true)
                    } else {
                        setChangedValue(false)
                    }
                    if (text) {
                        checkNumber(text)
                    } else {
                        setTextValue('')
                        setStock(0)
                    }
                }} style={styles.editInput} keyboardType='numeric' />
            <Pressable
                style={styles.editButton}
                onPress={() => editStock()}
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
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold'
    },
    editInput: {
        width: '25%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 4,
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