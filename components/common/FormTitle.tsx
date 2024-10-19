import { StyleSheet, Text, View } from 'react-native'

interface FormTitleProps {
    text: string
    children?: React.ReactNode
}

export default function FormTitle({ text, children }: FormTitleProps) {

    return (
        <View style={{
            ...styles.container,
            justifyContent: children ? 'space-between' : 'center'
        }}>
            <Text style={styles.text}>{text}</Text>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    text: {
        fontSize: 24,
        textAlign: 'center'
    }
})