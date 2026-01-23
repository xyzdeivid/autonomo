import { useContext } from 'react'

import { View } from 'react-native'
import RevenueChart from './MonthlyRevenueChart'
import RevenueList from './MonthlyRevenueList'

import { DocsContext } from '@/context/DocsContext'

import { filterSchedulings, filterExpenses } from '@/utils/common'
import FinancePeriodButtons from './FinancePeriodButtons'
import InfoTitle from './InfoTitle'
import { Hr } from './Hr'

interface MonthlyRevenueProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function MonthlyRevenue({ period, setPeriod }: MonthlyRevenueProps) {

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.entries
    const [expenses] = appDocs.outflows
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth

    return (
        <View>
            <InfoTitle text='Finanças Gerais' />
            {
                filterSchedulings(schedulings, selectedMonth, currentYear)[0] &&
                <FinancePeriodButtons period={period} setPeriod={setPeriod} />
            }
            <Hr />
            <RevenueChart
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth, currentYear)}
                filteredExpenses={filterExpenses(expenses, selectedMonth, currentYear)}
            />
            <RevenueList
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth, currentYear)}
                filteredExpenses={filterExpenses(expenses, selectedMonth, currentYear)}
            />
        </View>
    )

}