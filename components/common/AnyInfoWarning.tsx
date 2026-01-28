import { View, Text, StyleSheet } from 'react-native'

interface AnyInfoWarningProps {
    text: string,
    titleBgColor: string
    textBgColor: string
}

export default function AnyInfoWarning({ text, titleBgColor, textBgColor }: AnyInfoWarningProps) {

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={{
                    ...styles.warningTextTitle,
                    backgroundColor: titleBgColor
                }}>
                    Nenhuma informação disponível!
                </Text>
                <Text style={{
                    ...styles.warningText,
                    backgroundColor: textBgColor
                }}>
                    Nesta seção, {text}
                </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        marginHorizontal: 24
    },

    warningTextTitle: {
        textAlign: 'center',
        color: '#FFFFFF',
        padding: 12,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        fontSize: 16
    },

    warningText: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    }

})