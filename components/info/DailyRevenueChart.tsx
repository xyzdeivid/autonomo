import { useContext } from 'react'
import { filterSchedulings } from '@/functions/common'
import { getDays } from '@/functions/info'

import { View, Text } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'

export default function Daily() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)
    const filteredSchedulings = filterSchedulings(schedulings, selectedMonth)

    const data = () => {
        return getDays(filteredSchedulings).map(day => {
            return {
                label: day.day,
                value: day.amount
            }
        })
    }

    return (
        <View style={{ marginVertical: 20 }}>
            <BarChart
                data={data()}
                cappedBars
                capColor='darkblue'
                capThickness={4}
                frontColor='lightblue'
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
                yAxisThickness={0}
                xAxisThickness={0}
                barWidth={12}
            />
            <View style={{ marginTop: 8, marginStart: 8 }}>
                <Text>Y: Valor</Text>
                <Text>X: Dia</Text>
            </View>
        </View>
    )

}