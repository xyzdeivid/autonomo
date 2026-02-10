import { LineChart } from 'react-native-gifted-charts'


import { colors } from '@/styles/appColors'
import { moneyFormat } from '@/utils/common'
import { useGetRevenuePerDayInTheMonth } from '@/hooks/index/useGetRevenuePerDayInTheMonth'
import { useGetTheme } from '@/hooks/common/useGetTheme'

export function DailyFinanceChart() {

    const theme = useGetTheme()

    const revenuePerDayInTheMonth = useGetRevenuePerDayInTheMonth()

    const data = () => {
        return revenuePerDayInTheMonth.map(current => {
            return {
                value: current.value,
                dataPointText: moneyFormat(current.value),
                label: current.day
            }
        })
    }

    const chartData = data()
    const max = Math.max(...chartData.map(item => item.value))

    return (
        <LineChart
            data={data()}
            spacing={56}
            initialSpacing={16}
            textColor1={theme === 'dark' ? colors.cardText.dark : colors.cardText.light}
            textShiftY={-8}
            textShiftX={-12}
            textFontSize={12}
            thickness={2}
            hideRules
            hideYAxisText
            yAxisColor='transparent'
            xAxisColor='transparent'
            showVerticalLines
            verticalLinesColor={theme === 'dark' ? colors.home.mid : colors.home.midMin}
            color={theme === 'dark' ? '#8E8E8E' : colors.home.midMin}
            maxValue={max * 1.1}
            dataPointsColor1='#0a7878'
            textFontSize1={14}
            xAxisLabelTextStyle={{ color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}
        />
    )

}