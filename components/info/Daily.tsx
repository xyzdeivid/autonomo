import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'
import { filterSchedulings, moneyFormat } from '@/functions/common'
import { getDays } from '@/functions/info'
import { useContext } from 'react'
import { View, Text } from 'react-native'

export default function Daily() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)
    const filteredSchedulings = filterSchedulings(schedulings, selectedMonth)

    return (
        <View>
            {getDays(filteredSchedulings).map(day => {
                return (
                    <Text>Dia {day.day}: {moneyFormat(day.amount)}</Text>
                )
            })}
        </View>
    )

}