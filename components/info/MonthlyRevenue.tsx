import { useContext } from 'react'

import { View } from 'react-native'
import RevenueChart from './MonthlyRevenueChart'
import RevenueList from './MonthlyRevenueList'

import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'

import { filterSchedulings, filterExpenses } from '@/functions/common'
import FinancePeriodButtons from './FinancePeriodButtons'
import InfoTitle from '../common/InfoTitle'

interface MonthlyRevenueProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function MonthlyRevenue({ period, setPeriod }: MonthlyRevenueProps) {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)

    return (
        <View>
            <InfoTitle text='Finanças Gerais' />
            <RevenueChart
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                filteredExpenses={filterExpenses(expenses, selectedMonth)}
            />
            <RevenueList
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                filteredExpenses={filterExpenses(expenses, selectedMonth)}
            />
            <View style={{
                width: '85%',
                height: 1,
                backgroundColor: 'lightgray',
                marginHorizontal: 'auto',
                marginTop: 20,
                marginBottom: 24
            }} />
            <FinancePeriodButtons period={period} setPeriod={setPeriod} />
        </View>
    )

}