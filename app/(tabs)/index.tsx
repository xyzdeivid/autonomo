import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import RevenueChart from '@/components/info/RevenueChart'
import { View } from 'react-native'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import RevenueList from '@/components/info/RevenueList'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterExpenses, filterSchedulings } from '@/functions/common'

export default function Info() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)

    const Revenue = () => (
        <View>
            <RevenueChart
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                filteredExpenses={filterExpenses(expenses, selectedMonth)}
            />
            <RevenueList
                filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                filteredExpenses={filterExpenses(expenses, selectedMonth)}
            />
        </View>
    )

    return (
        <Container>
            {
                schedulings[0]
                    ? <View>
                        <MonthInput />
                        <Revenue />
                    </View>
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
        </Container>
    )

}