import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

export default function ResaleButton() {

    const [active, setActive] = useState(false)

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
                <Text>Revenda</Text>
                <Pressable
                    style={{
                        ...styles.box,
                        backgroundColor: active ? '#330066' : 'transparent'
                    }}
                    onPress={() => setActive(!active)}
                />
            </View>
            <Text style={styles.text}>Preencha se o produto for uma revenda.</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    box: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#330066',
        marginStart: 4,
        borderRadius: 5
    },
    text: {
        color: 'gray',
        fontSize: 12,
        marginTop: 2
    }
})