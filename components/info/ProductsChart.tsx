import { colors } from '@/constants/chartColors';
import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

interface ProductsChartProps {
    products: {
        product: string;
        amount: number;
    }[]
}

export default function ProductsChart({ products }: ProductsChartProps) {

    let indexColor = 0

    const getColor = () => {
        const actualColor = colors[indexColor]
        indexColor++
        return actualColor
    }

    const data = () => {
        return products.map(current => {
            return { value: current.amount, color: getColor() }
        })
    }

    return (
        <View style={{ marginHorizontal: 'auto', marginBottom: 40 }}>
            <PieChart data={data()} donut />
        </View>
    )

}