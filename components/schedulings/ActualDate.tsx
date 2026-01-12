import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import DateInput from '../common/DateInput'

interface ActualDateProps {
    date: string
    setNewDate: React.Dispatch<React.SetStateAction<string>>
    editDate: () => Promise<void>
}

export default function ActualDate({ date, setNewDate, editDate }: ActualDateProps) {

    const [editInput, setEditInput] = useState(false)

    return (
        <>
            {
                !editInput
                    ? <View style={styles.container}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Data:</Text>
                        <Text style={{ fontSize: 16 }}> {date}</Text>
                        <Pressable
                            style={styles.editButton}
                            onPress={() => setEditInput(true)}
                        >
                            <Text style={{ fontSize: 16 }}>Editar</Text>
                        </Pressable>
                    </View>
                    : <>
                        <DateInput
                            setTargetDate={setNewDate}
                        />
                        <Pressable
                            style={styles.confirmButton}
                            onPress={() => editDate()}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Alterar</Text>
                        </Pressable>
                    </>
            }
        </>
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
        padding: 8,
        borderRadius: 4,
        marginStart: 8
    },
    confirmButton: {
        backgroundColor: '#006600',
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: -14,
        marginBottom: 12
    }
})