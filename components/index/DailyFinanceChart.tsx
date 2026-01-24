import { useContext } from 'react'
import { LineChart } from 'react-native-gifted-charts'
import { getDays } from '@/utils/info'

import { DocsContext } from '@/context/DocsContext'
import { filterIncomesByMonth } from '@/rules/domainRules'
import { colors } from '@/styles/appColors'
import { moneyFormat } from '@/utils/common'
import { StyleSheet, View } from 'react-native'

export function DailyFinanceChart() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth
    const filteredIncomes = filterIncomesByMonth(entries, selectedMonth, currentYear)

    const data = () => {
        return getDays(filteredIncomes).map(day => {
            return {
                value: day.amount,
                dataPointText: moneyFormat(day.amount),
                label: day.day
            }
        })
    }

    const chartData = data()
const max = Math.max(...chartData.map(item => item.value))

    return (
        <View style={styles.container}>
            <LineChart
                data={data()}
                spacing={48}
                initialSpacing={48}
                textColor1='black'
                textShiftY={-8}
                textShiftX={-10}
                textFontSize={12}
                thickness={2}
                hideRules
                hideYAxisText
                yAxisColor="transparent"
                xAxisColor='transparent'
                showVerticalLines
                verticalLinesColor={colors.home.midMin}
                color={colors.home.midMin}
                maxValue={max * 1.1}
                dataPointsColor1='#0a7878'
                backgroundColor='F5F7F8'
                textFontSize1={14}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F5F7F8', 
        marginHorizontal: 24, 
        paddingVertical: 36,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#0000001A'
    }

})