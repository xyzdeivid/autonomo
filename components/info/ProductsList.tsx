import { colors } from '@/constants/chartColors';
import { Entypo } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

interface ProductsListProps {
    products: {
        product: string;
        amount: number;
    }[]
}

export default function ProductsList({ products }: ProductsListProps) {

    let indexColor = 0

    const getColor = () => {
        const actualColor = colors[indexColor]
        indexColor++
        return actualColor
    }

    return (
        <View style={styles.container}>
            {products.map(current => {
                return (
                    <View key={current.product} style={styles.infoContainer}>
                        <Entypo name='flickr-with-circle' size={16} color={getColor()} />
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>{current.product}:</Text> {current.amount}x</Text>
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