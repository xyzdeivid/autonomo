import { View, Text, Pressable, StyleSheet } from 'react-native'

interface CreateItemFormHeaderProps {
    title: string
    onComeBackButtonPress: () => void
}

export default function CreateItemFormHeader({ title, onComeBackButtonPress }: CreateItemFormHeaderProps) {

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Pressable
                    style={styles.button}
                    onPress={onComeBackButtonPress}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </Pressable>
            </View>
            <View style={styles.hr} />
        </>
    )

}

const styles = StyleSheet.create({

    header: {
        backgroundColor: 'rgba(51, 0, 102, 0.25)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8
    },

    headerTitle: {
        color: '#330066',
        fontSize: 24,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: 'rgba(51, 0, 102, 0.1)',
        padding: 6,
        borderRadius: 8
    },

    buttonText: {
        fontSize: 16,
        color: 'white'
    },

    hr: {
        marginTop: 12,
        marginBottom: 24,
        width: '100%',
        height: 1.25,
        backgroundColor: 'rgba(51, 0, 102, 0.25)'
    }

})