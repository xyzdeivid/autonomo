import { useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

export default function FreeSaleButton() {

    const [active, setActive] = useState(false)

    return (
        <Pressable 
        onPress={() => setActive(!active)}
        style={{
            ...styles.body,
            backgroundColor: active ? '#006600' : 'transparent'
        }}
        >
            <Text style={{
                color: active ? 'white' : '#003300'
            }}>Venda Livre</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    body: {
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#003300',
        marginBottom: 20
    }
})