import { useContext } from 'react'

import { View } from 'react-native'
import RevenueChart from './RevenueChart'
import RevenueList from './RevenueList'

import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'

import { filterSchedulings, filterExpenses } from '@/functions/common'

export default function MonthlyRevenue() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)

    return (
        <View>
            <RevenueChart
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                filteredExpenses={filterExpenses(expenses, selectedMonth)}
            />
            <View style={{
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1,
                marginHorizontal: 10,
                marginBottom: 20
            }}
            />
            <RevenueList
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                filteredExpenses={filterExpenses(expenses, selectedMonth)}
            />
        </View>
    )

}