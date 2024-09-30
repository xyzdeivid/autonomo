import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

interface ServicesChartProps {
    services: {
        service: string;
        amount: number;
        color: string;
    }[]
}

export default function ServicesChart({ services }: ServicesChartProps) {

    const data = () => {
        return services.map(current => {
            return { value: current.amount, color: current.color }
        })
    }

    return (
        <View style={{ marginHorizontal: 'auto', marginVertical: 20 }}>
            <PieChart data={data()} donut />
        </View>
    )

}