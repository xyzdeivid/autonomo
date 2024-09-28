import { View } from 'react-native'
import RevenueChart from './RevenueChart'
import RevenueList from './RevenueList'

import { filterExpenses, filterSchedulings } from '@/functions/common'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'

export default function Revenue() {
    
    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)

    return (
        <View style={{ zIndex: -1 }}>
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