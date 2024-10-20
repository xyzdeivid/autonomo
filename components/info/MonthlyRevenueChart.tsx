import { Expense, Scheduling } from '@/context/DocsContext'
import { findGreaterData } from '@/functions/info'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { StyleSheet, View } from 'react-native'
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
                    frontColor: '#009900',
                    capColor: '#006600'
                },
                {
                    value: getExpenses(filteredExpenses),
                    frontColor: '#990000',
                    capColor: '#660000'
                },
                {
                    value: getProfit(filteredSchedulings, filteredExpenses),
                    frontColor: '#000099',
                    capColor: '#000066'
                }
            ]
        } else {
            return [
                {
                    value: getSchedulingsRevenue(filteredSchedulings),
                    frontColor: '#009900',
                    capColor: '#006600'
                },
                {
                    value: getExpenses(filteredExpenses),
                    frontColor: '#990000',
                    capColor: '#660000'
                }
            ]
        }
    }

    return (
        <View style={styles.container}>
            <BarChart
                yAxisThickness={0}
                xAxisThickness={2}
                barWidth={60}
                data={getData()}
                maxValue={findGreaterData(filteredSchedulings, filteredExpenses)}
                hideYAxisText
                cappedBars
                hideRules
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        backgroundColor: 'rgba(17, 41, 53, 0.05)',
        padding: 12,
        borderRadius: 12
    }
})