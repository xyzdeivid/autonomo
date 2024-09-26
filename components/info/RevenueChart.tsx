import { DocsContext, Expense, Scheduling } from '@/context/DocsContext'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
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
        <BarChart data={data} />
    )

}