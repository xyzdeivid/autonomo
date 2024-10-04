import { StyleSheet, Text } from 'react-native'

interface AnyItemWarningProps {
    text: string
}

export default function AnyItemWarning({ text }: AnyItemWarningProps) {

    return (
        <>
            <Text style={styles.text}>{text}</Text>
        </>
    )

}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 16,
        padding: 20,
        margin: 20,
        backgroundColor: 'darkgray',
        borderRadius: 10
    }
})