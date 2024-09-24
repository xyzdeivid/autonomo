import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { BarChart } from 'react-native-gifted-charts'

export default function RevenueChart() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses
    const getSchedulingsRevenue = () => {
        return schedulings.reduce((prev, current) => {
            return prev + current.service.value
        }, 0)
    }

    const getExpenses = () => {
        return expenses.reduce((prev, current) => {
            return prev + current.value
        }, 0)
    }

    const getProfit = () => {
        return getSchedulingsRevenue() - getExpenses()
    }
    const data = [
        { label: 'Receita', value: getSchedulingsRevenue(), frontColor: 'darkgreen' },
        { label: 'Despesa', value: getExpenses(), frontColor: 'darkred' },
        { label: 'Lucro', value: getProfit(), frontColor: 'darkblue' }
    ]

    return (
        <BarChart data={data} />
    )

}