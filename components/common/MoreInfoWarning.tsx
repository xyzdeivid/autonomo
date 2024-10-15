import { View, Text, StyleSheet } from 'react-native'

export default function MoreInfoWarning() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Para mais informações ou exclusão do item, basta clicar sobre ele!</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        padding: 8
    },
    text: {
        fontSize: 10,
        color: 'gray'
    }
})