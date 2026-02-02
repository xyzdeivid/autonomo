import { LineChart } from 'react-native-gifted-charts'
import { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'


import { colors } from '@/styles/appColors'
import { moneyFormat } from '@/utils/common'
import { useGetRevenuePerDayInTheMonth } from '@/hooks/index/useGetRevenuePerDayInTheMonth'

interface DailyFinanceChartProps {
    comingFrom: number
}

export function DailyFinanceChart({ comingFrom }: DailyFinanceChartProps) {

    const screenWidth = Dimensions.get('window').width
    const direction = comingFrom < 1 ? screenWidth : -screenWidth
    const slideAnim = useRef(new Animated.Value(direction)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

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
        <Animated.View
            style={{
                transform: [{ translateX: slideAnim }],
                marginTop: 2
            }}
        >
            <LineChart
                data={data()}
                spacing={56}
                initialSpacing={24}
                textColor1='black'
                textShiftY={-8}
                textShiftX={-12}
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
        </Animated.View>
    )

}