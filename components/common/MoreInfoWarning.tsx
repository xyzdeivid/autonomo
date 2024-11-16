import { FontAwesome } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

export default function MoreInfoWarning() {

    return (
        <View style={styles.container}>
            <FontAwesome name='info-circle' size={10} color='#000000' />
            <Text style={styles.text}>Para mais informações ou exclusão do registro, basta clicar sobre!</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        padding: 8,
        marginHorizontal: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 10,
        color: 'gray',
        marginStart: 2
    }
})