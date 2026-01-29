import { StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

export function Info({ text }: { text: string }) {

    return (
        <View style={styles.container}>
            <AntDesign name="double-right" size={16} color="black" />
            <Text style={{ fontSize: 16 }}>{text}</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 12
    }

})