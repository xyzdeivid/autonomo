import { View, StyleSheet, Text } from 'react-native'

interface AnyInfoWarningProps {
    page: string,
    text: string,
    bgColor: string
}

export default function AnyInfoWarning({ page, text, bgColor }: AnyInfoWarningProps) {

    return (
        <View style={styles.container}>
            <Text style={{
                ...styles.warningTextTitle,
                backgroundColor: bgColor
                }}>
                Nenhuma {page} disponível!
            </Text>
            <Text style={styles.warningText}>
                {text}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 30
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
        paddingHorizontal: 4
    }

})