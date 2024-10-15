import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

interface BudgetsChartProps {
    budgets: {
        service: string;
        amount: number;
        color: string;
    }[]
}

export default function BudgetsChart({ budgets }: BudgetsChartProps) {

    const data = () => {
        return budgets.map(current => {
            return { value: current.amount, color: current.color }
        })
    }

    return (
        <View style={{ marginHorizontal: 'auto', marginBottom: 40 }}>
            <PieChart data={data()} donut />
        </View>
    )

}