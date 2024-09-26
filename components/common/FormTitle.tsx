import { StyleSheet, Text } from 'react-native'

interface FormTitleProps {
    text: string
}

export default function FormTitle({ text }: FormTitleProps) {

    return (
        <Text style={styles.text}>{text}</Text>
    )

}

const styles = StyleSheet.create({
    text: {
        fontSize: 24, 
        textAlign: 'center', 
        marginBottom: 20,
        backgroundColor: '#E0E0E0',
        borderBottomWidth: 1,
        padding: 8,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    }
})