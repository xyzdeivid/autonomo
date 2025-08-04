import { View, Text, StyleSheet } from 'react-native'

interface AnyInfoWarningProps {
    page: string,
    text: string,
    titleBgColor: string
    textBgColor: string
}

export default function AnyInfoWarning({ page, text, titleBgColor, textBgColor }: AnyInfoWarningProps) {

    return (
        <View style={styles.container}>
            <Text style={{
                ...styles.warningTextTitle,
                backgroundColor: titleBgColor
            }}>
                Nenhuma {page} disponível!
            </Text>
            <Text style={{
                ...styles.warningText,
                backgroundColor: textBgColor,
                borderBottomColor: titleBgColor
            }}>
                Nesta seção, {text}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 40,
        marginHorizontal: 30
    },

    warningTextTitle: {
        textAlign: 'center',
        color: '#FFFFFF',
        padding: 8,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
    },

    warningText: {
        borderBottomWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 12
    }

})