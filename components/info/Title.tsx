import { Text, StyleSheet, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useEffect, useState } from 'react'

interface TitleProps {
    content: string
    setContentForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Title({ content, setContentForm }: TitleProps) {

    const [buttonText, setButtonText] = useState('')

    useEffect(() => {
        switch (content) {
            case 'financial':
                setButtonText('Finanças')
                break
            case 'services':
                setButtonText('Serviços')
                break
            case 'products':
                setButtonText('Produtos')
                break
        }
    }, [content])

    return (
        <Pressable onPress={() => setContentForm(true)} style={styles.container}>
            <Text style={styles.title}>{buttonText}</Text>
            <MaterialIcons name='expand-more' size={28} color='black' />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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