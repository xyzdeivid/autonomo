import { Expense, Scheduling } from '@/context/DocsContext'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

interface RevenueChartProps {
    filteredSchedulings: Scheduling[]
    filteredExpenses: Expense[]
}

export default function RevenueChart({ filteredSchedulings, filteredExpenses }: RevenueChartProps) {

    const data = [
        { value: getSchedulingsRevenue(filteredSchedulings), frontColor: 'darkgreen' },
        { value: getExpenses(filteredExpenses), frontColor: 'darkred' },
        { value: getProfit(filteredSchedulings, filteredExpenses), frontColor: 'darkblue' }
    ]

    return (
        <View style={{margin: 'auto' }}>
            <BarChart
                yAxisThickness={0}
                xAxisThickness={0}
                data={data}
                maxValue={getSchedulingsRevenue(filteredSchedulings)}
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
            />
        </View>
    )

}