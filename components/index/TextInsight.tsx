import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

export function TextInsight({ text }: { text: string }) {

    return (
        <View style={styles.insightTextContainer}>
            <AntDesign name='exclamation-circle' size={12} color='#000000CC' />
            <Text style={styles.insightText}>{text}</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    insightTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },

    insightText: {
        fontStyle: 'italic',
        color: 'gray',
        marginStart: 4,
        marginBottom: 1
    }

})