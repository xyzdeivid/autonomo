import { StyleSheet, Text, View } from 'react-native'

interface FormTitleProps {
    text: string
    children?: React.ReactNode
    textColor?: string
}

export default function FormTitle({ text, children, textColor }: FormTitleProps) {

    return (
        <View style={{
            ...styles.container,
            justifyContent: children ? 'space-between' : 'flex-start'
        }}>
            <Text style={{
                ...styles.text,
                color: textColor ? textColor : 'black',
                maxWidth: children ? 300 : null
            }}
            >
                {text}
            </Text>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 8
    },
    text: {
        fontSize: 24,
        marginEnd: 8
    }
})