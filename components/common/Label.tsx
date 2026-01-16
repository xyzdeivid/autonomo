import { StyleSheet, Text } from 'react-native'

interface LabelProps {
    text: string
    color?: string
}

export function Label({ text, color }: LabelProps) {

    return (
        <Text style={{
            ...styles.label,
            color: color ? color : '#000'
        }}>
            {text}
        </Text>
    )

}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 16
    }
})