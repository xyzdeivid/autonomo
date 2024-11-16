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

    const column = (value: number, frontColor: string, capColor: string) => {

        return {
            value,
            frontColor,
            capColor
        }

    }

    const getData = () => {

        const data = []

        if (getSchedulingsRevenue(filteredSchedulings) > 0) {

            const revenueColumn = column(getSchedulingsRevenue(filteredSchedulings), '#009900', '#006600')

            data.push(revenueColumn)

        }

        if (getExpenses(filteredExpenses) > 0) {

            const expensesColumn = column(getExpenses(filteredExpenses), '#990000', '#660000')

            data.push(expensesColumn)

        }

        if (getProfit(filteredSchedulings, filteredExpenses) > 0) {

            const profitColumn = column(getProfit(filteredSchedulings, filteredExpenses), '#000099', '#000066')

            data.push(profitColumn)

        }

        return data

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