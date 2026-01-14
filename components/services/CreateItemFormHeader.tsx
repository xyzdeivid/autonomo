import { View, Text, Pressable, StyleSheet } from 'react-native'

interface CreateItemFormHeaderProps {
    title: string
    onComeBackButtonPress: () => void
}

export default function CreateItemFormHeader({ title, onComeBackButtonPress }: CreateItemFormHeaderProps) {

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Pressable
                style={styles.comeBackButton}
                onPress={onComeBackButtonPress}
            >
                <Text style={styles.comeBackButtonText}>Voltar</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({

    header: {
        backgroundColor: 'rgba(51, 0, 102, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        padding: 12,
        borderRadius: 8
    },

    headerTitle: {
        color: '#330066',
        fontSize: 24,
        fontWeight: 'bold'
    },

    comeBackButton: {
        backgroundColor: '#330066',
        padding: 4,
        borderRadius: 2
    },

    comeBackButtonText: {
        fontSize: 16,
        color: 'white'
    }

})