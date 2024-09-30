import { Entypo } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

interface ServicesListProps {
    services: {
        service: string;
        amount: number;
        color: string;
    }[]
}

export default function ServicesList({ services }: ServicesListProps) {

    return (
        <View style={styles.container}>
            {services.map(current => {
                return (
                    <View key={current.service} style={styles.infoContainer}>
                        <Entypo name='flickr-with-circle' size={16} color={current.color} />
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>{current.service}:</Text> {current.amount}x</Text>
                    </View>
                )
            })}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginStart: 8,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    text: {
        marginStart: 4
    }
})