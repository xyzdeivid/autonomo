import { Text, View, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useEffect, useState } from 'react'

interface TitleProps {
    content: string
}

export default function Title({ content }: TitleProps) {

    const [buttonText, setButtonText] = useState('')

    useEffect(() => {
        switch (content) {
            case 'financial':
                setButtonText('Financeiro')
                break
        }
    }, [content])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{buttonText}</Text>
            <MaterialIcons name='expand-more' size={28} color='black' />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginTop: 10
    },
    title: {
        fontSize: 32
    }
})