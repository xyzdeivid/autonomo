import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

export function TextInsight({ text }: { text: string }) {

    return (
        <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#0000001A', marginTop: 20, paddingTop: 8 }}>
            <View style={styles.insightTextContainer}>
            <AntDesign name='exclamation-circle' size={12} color='#000000CC' />
            <Text style={styles.insightText}>{text}</Text>
        </View>
        </View>
    )

}

const styles = StyleSheet.create({

    insightTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9D9C9C1A',
        padding: 4,
        borderRadius: 8
    },

    insightText: {
        fontStyle: 'italic',
        color: 'gray',
        marginStart: 4,
        marginBottom: 1
    }

})