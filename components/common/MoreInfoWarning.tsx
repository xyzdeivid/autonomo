import { View, Text, StyleSheet } from 'react-native'

interface MoreInfoWarningProps {
    text: string
}

export default function MoreInfoWarning({ text }: MoreInfoWarningProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14
    },
    text: {
        fontSize: 10,
        color: 'gray',
        marginTop: 8,
        marginStart: 4
    }
})