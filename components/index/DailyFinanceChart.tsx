import { LineChart } from 'react-native-gifted-charts'
import { getDays } from '@/utils/info'
import { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'


import { colors } from '@/styles/appColors'
import { moneyFormat } from '@/utils/common'
import { Entry } from '@/types'

interface DailyFinanceChartProps {
    filteredIncomes: Entry[]
}

export function DailyFinanceChart({ filteredIncomes }: DailyFinanceChartProps) {

    const screenWidth = Dimensions.get('window').width
    const slideAnim = useRef(new Animated.Value(screenWidth)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

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
        <Animated.View
            style={{
                transform: [{ translateX: slideAnim }]
            }}
        >
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
        </Animated.View>
    )

}