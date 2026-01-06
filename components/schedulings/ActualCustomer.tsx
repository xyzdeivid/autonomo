import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'

interface ActualCustomerProps {
    customer: string
    setNewCustomerName: React.Dispatch<React.SetStateAction<string>>
    newCustomerName: string
    editCustomerName: () => Promise<void>
}

export default function ActualCustomer({ customer, setNewCustomerName, newCustomerName, editCustomerName }: ActualCustomerProps) {

    const [editInput, setEditInput] = useState(false)

    return (
        <>
            {
                !editInput
                    ? <View style={styles.container}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cliente:</Text>
                        <Text style={{ fontSize: 16 }}> {customer}</Text>
                        <Pressable
                            style={styles.editButton}
                            onPress={() => setEditInput(true)}
                        >
                            <Text style={{ fontSize: 16 }}>Editar</Text>
                        </Pressable>
                    </View>
                    : <View style={styles.container}>
                        <Text style={styles.label}>Cliente:</Text>
                        <TextInput
                            defaultValue={customer}
                            onChangeText={text => setNewCustomerName(text.trim())}
                            style={styles.editInput}
                        />
                        <Pressable
                            style={styles.confirmButton}
                            onPress={() => {
                                if (!newCustomerName) {
                                    setEditInput(false)
                                } else {
                                    editCustomerName()
                                }
                            }}
                        >
                            <Text style={{ color: 'white' }}>Ok</Text>
                        </Pressable>
                    </View>
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
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    editInput: {
        width: '50%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },
    confirmButton: {
        backgroundColor: 'blue',
        borderColor: 'darkblue',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})