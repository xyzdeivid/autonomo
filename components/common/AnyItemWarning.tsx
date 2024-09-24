import { StyleSheet, Text } from 'react-native'

export default function AnyItemWarning() {

    return (
        <>
            <Text style={styles.text}>Nenhum item cadastrado</Text>
        </>
    )

}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        padding: 20
    }
})