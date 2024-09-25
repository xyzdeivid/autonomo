import { FontAwesome6 } from "@expo/vector-icons"
import { StyleSheet, View, Text } from "react-native"

export default function MostOfferedServicesTitle() {

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Serviços</Text>
            <FontAwesome6 name='money-bill-trend-up' size={24} color='white' />
        </View>
    )

}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#000033',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginEnd: 8
    }
})