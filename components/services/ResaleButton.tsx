import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

interface ResaleButtonProps {
    resale: boolean
    setResale: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResaleButton({ resale, setResale }: ResaleButtonProps) {

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
                <Text style={{ color: '#330066', fontWeight: 'bold' }}>Revenda</Text>
                <Pressable
                    style={{
                        ...styles.box,
                        backgroundColor: resale ? '#330066' : 'transparent'
                    }}
                    onPress={() => {
                        setResale(resale => !resale)
                    }}
                />
            </View>
            <Text style={styles.text}>Caso você esteja revendendo o produto.</Text>
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
        color: 'rgba(51, 0, 102, 0.5)',
        fontSize: 12,
        marginTop: 2
    }
})