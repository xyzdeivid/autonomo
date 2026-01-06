import { StyleSheet, Text, View } from 'react-native'

interface FormTitleProps {
    text: string
    textColor?: string
}

export default function FormTitle({ text, textColor }: FormTitleProps) {

    return (
        <View style={styles.container}>
            <Text style={{
                ...styles.text,
                color: textColor ? textColor : 'black'
            }}
            >
                {text}
            </Text>
            <View style={{
                ...styles.hr,
                backgroundColor: textColor ? textColor : 'black'
            }} 
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    hr: {
        width: '100%',
        height: 0.5,
        marginVertical: 16
    },
    text: {
        fontSize: 28,
        marginEnd: 8,
        fontWeight: '500',
        textAlign: 'center'
    }
})