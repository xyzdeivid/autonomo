import { Text, View, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function Title() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Financeiro</Text>
            <MaterialIcons name='expand-more' size={28} color='black' />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10
    },
    title: {
        fontSize: 32
    }
})