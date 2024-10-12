import { Expense, Scheduling } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { findGreaterData } from '@/functions/info'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { Text, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

interface RevenueChartProps {
    filteredSchedulings: Scheduling[]
    filteredExpenses: Expense[]
}

export default function RevenueChart({ filteredSchedulings, filteredExpenses }: RevenueChartProps) {

    const getData = () => {
        if (getProfit(filteredSchedulings, filteredExpenses) > 0) {
            return [
                {
                    value: getSchedulingsRevenue(filteredSchedulings),
                    frontColor: '#006600',
                    topLabelComponent: () => (
                        <Text style={{ color: 'black', fontSize: 8, marginBottom: 2 }}>
                            {moneyFormat(getSchedulingsRevenue(filteredSchedulings))}
                        </Text>
                    )
                },
                {
                    value: getExpenses(filteredExpenses),
                    frontColor: '#660000',
                    topLabelComponent: () => (
                        <Text style={{ color: 'black', fontSize: 8, marginBottom: 2 }}>
                            {moneyFormat(getExpenses(filteredExpenses))}
                        </Text>
                    )
                },
                {
                    value: getProfit(filteredSchedulings, filteredExpenses),
                    frontColor: '#000066',
                    topLabelComponent: () => (
                        <Text style={{ color: 'black', fontSize: 8, marginBottom: 2 }}>
                            {moneyFormat(getProfit(filteredSchedulings, filteredExpenses))}
                        </Text>
                    )
                }
            ]
        } else {
            return [
                {
                    value: getSchedulingsRevenue(filteredSchedulings),
                    frontColor: '#006600',
                    topLabelComponent: () => (
                        <Text style={{ color: 'black', fontSize: 8, marginBottom: 2 }}>
                            {moneyFormat(getSchedulingsRevenue(filteredSchedulings))}
                        </Text>
                    )
                },
                {
                    value: getExpenses(filteredExpenses),
                    frontColor: '#660000',
                    topLabelComponent: () => (
                        <Text style={{ color: 'black', fontSize: 8, marginBottom: 2 }}>
                            {moneyFormat(getExpenses(filteredExpenses))}
                        </Text>
                    )
                }
            ]
        }
    }

    return (
        <View style={{ marginHorizontal: 'auto', }}>
            <BarChart
                yAxisThickness={0}
                xAxisThickness={2}
                barWidth={45}
                data={getData()}
                hideRules
                maxValue={findGreaterData(filteredSchedulings, filteredExpenses)}
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
            />
        </View>
    )

}