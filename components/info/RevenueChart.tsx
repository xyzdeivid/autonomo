import { DocsContext } from '@/context/DocsContext'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { useContext } from 'react'
import { BarChart } from 'react-native-gifted-charts'

export default function RevenueChart() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const data = [
        { label: 'Receita', value: getSchedulingsRevenue(schedulings), frontColor: 'darkgreen' },
        { label: 'Despesa', value: getExpenses(expenses), frontColor: 'darkred' },
        { label: 'Lucro', value: getProfit(schedulings, expenses), frontColor: 'darkblue' }
    ]

    return (
        <BarChart data={data} />
    )

}