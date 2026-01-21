import { StyleSheet, Text } from 'react-native'

interface LabelProps {
    text: string
}

export function Label({ text }: LabelProps) {

    return (
        <Text style={{
            ...styles.label
        }}>
            {text}
        </Text>
    )

}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        paddingHorizontal: 8,
        color: 'white',
        fontWeight: '500'
    }
})