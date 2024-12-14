import { useContext } from 'react'
import { filterSchedulings, moneyFormat } from '@/functions/common'
import { getDays } from '@/functions/info'

import { View, Text, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

import { DocsContext } from '@/context/DocsContext'

export default function DailyRevenueChart() {

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.entries
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth
    const filteredSchedulings = filterSchedulings(schedulings, selectedMonth, currentYear)

    const data = () => {
        return getDays(filteredSchedulings).map(day => {
            return {
                label: `Dia ${day.day}`,
                value: day.amount,
                topLabelComponent: () => (
                    <Text style={{ fontSize: 10, marginBottom: 2, color: '#004C99' }} >{moneyFormat(day.amount)}</Text>
                )
            }
        })
    }

    const findTheMostProfitableDay = () => {
        const values = getDays(filteredSchedulings).map(day => {
            return day.amount
        })
        return values.sort((a, b) => b - a)[0]
    }

    return (
        <View style={styles.container}>
            <BarChart
                data={data()}
                cappedBars
                capColor='#0080FF'
                capThickness={4}
                frontColor='#66B2FF'
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
                maxValue={findTheMostProfitableDay() + 20}
                hideYAxisText
                hideRules
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisColor='lightgray'
                xAxisLabelTextStyle={{ color: '#000000' }}
                barWidth={42}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(17, 41, 53, 0.05)',
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 20
    }
})