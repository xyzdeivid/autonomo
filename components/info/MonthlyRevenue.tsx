import { useContext } from 'react'

import { View } from 'react-native'
import RevenueChart from './MonthlyRevenueChart'
import RevenueList from './MonthlyRevenueList'

import { DocsContext } from '@/context/DocsContext'

import { filterSchedulings, filterExpenses } from '@/functions/common'
import FinancePeriodButtons from './FinancePeriodButtons'
import InfoTitle from '../common/InfoTitle'

interface MonthlyRevenueProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function MonthlyRevenue({ period, setPeriod }: MonthlyRevenueProps) {

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.schedulings
    const [expenses] = appDocs.expenses
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth

    return (
        <View>
            <InfoTitle text='Finanças Gerais' />
            <RevenueChart
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth, currentYear)}
                filteredExpenses={filterExpenses(expenses, selectedMonth, currentYear)}
            />
            <RevenueList
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth, currentYear)}
                filteredExpenses={filterExpenses(expenses, selectedMonth, currentYear)}
            />
            <View style={{
                width: '85%',
                height: 1,
                backgroundColor: 'lightgray',
                marginHorizontal: 'auto',
                marginTop: 20,
                marginBottom: 24
            }} />
            {
                filterSchedulings(schedulings, selectedMonth, currentYear)[0] &&
                <FinancePeriodButtons period={period} setPeriod={setPeriod} />
            }
        </View>
    )

}