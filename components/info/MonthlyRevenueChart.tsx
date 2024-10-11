import { Expense, Scheduling } from '@/context/DocsContext'
import { findGreaterData } from '@/functions/info'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

interface RevenueChartProps {
    filteredSchedulings: Scheduling[]
    filteredExpenses: Expense[]
}

export default function RevenueChart({ filteredSchedulings, filteredExpenses }: RevenueChartProps) {

    const getData = () => {
        if (getProfit(filteredSchedulings, filteredExpenses) > 0) {
            return [
                { value: getSchedulingsRevenue(filteredSchedulings), frontColor: '#006600' },
                { value: getExpenses(filteredExpenses), frontColor: '#660000' },
                { value: getProfit(filteredSchedulings, filteredExpenses), frontColor: '#000066' }
            ]
        } else {
            return [
                { value: getSchedulingsRevenue(filteredSchedulings), frontColor: '#006600' },
                { value: getExpenses(filteredExpenses), frontColor: '#660000' }
            ]
        }
    }

    return (
        <View style={{ marginHorizontal: 'auto' }}>
            <BarChart
                yAxisThickness={0}
                xAxisThickness={0}
                data={getData()}
                maxValue={findGreaterData(filteredSchedulings, filteredExpenses)}
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
            />
        </View>
    )

}