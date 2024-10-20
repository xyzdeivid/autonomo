import { useContext } from 'react'
import { filterSchedulings, moneyFormat } from '@/functions/common'
import { getDays } from '@/functions/info'

import { View, Text } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'

export default function DailyRevenueChart() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)
    const filteredSchedulings = filterSchedulings(schedulings, selectedMonth)

    const data = () => {
        return getDays(filteredSchedulings).map(day => {
            return {
                label: `Dia ${day.day}`,
                value: day.amount,
                topLabelComponent: () => (
                    <Text style={{ fontSize: 10, marginBottom: 2, color: '#004C99' }} >{moneyFormat(day.amount)}</Text>
                ),
                barWidth: getBarWidth(day.amount)
            }
        })
    }

    const findTheMostProfitableDay = () => {
        const values = getDays(filteredSchedulings).map(day => {
            return day.amount
        })
        return values.sort((a, b) => b - a)[0]
    }

    const getBarWidth = (number: number) => {
        const basicWidth = 27
        const numberOfDigits = number.toString().length
        switch (numberOfDigits) {
            case 4:
                return basicWidth + 15
            case 3:
                return basicWidth + 6
            default:
                return basicWidth
        }
    }

    return (
        <View>
            <BarChart
                data={data()}
                cappedBars
                capColor='#0080FF'
                capThickness={4}
                frontColor='#66B2FF'
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
                maxValue={findTheMostProfitableDay() + 15}
                hideYAxisText
                hideRules
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisColor='lightgray'
                xAxisLabelTextStyle={{ color: '#000000' }}
            />
        </View>
    )

}