import { DailyFinanceChart } from './DailyFinanceChart'
import { TextInsight } from './TextInsight'
import { useGetAverageRevenuePerWorkingDayText } from '@/hooks/index/useGetAverageRevenuePerWorkingDayText'
import { Info } from './Info'
import { useEffect, useRef } from 'react'
import { useShowInsights } from '@/hooks/index/useShowInsights'
import { Animated, Dimensions, View } from 'react-native'
import { NoRevenueWarning } from './NoRevenueWarning'

interface DailyFinanceContentProps {
    comingFrom: number
    setComingFrom: React.Dispatch<React.SetStateAction<number>>
}

export function DailyFinanceContent({ comingFrom, setComingFrom }: DailyFinanceContentProps) {


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

    useEffect(() => {
        setComingFrom(1)
    }, [setComingFrom])

    const averageRevenuePerWorkingDay = useGetAverageRevenuePerWorkingDayText()
    const showInsights = useShowInsights()

    return (
        <>
            <Info text='Quanto você faturou em cada dia do mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }],
                    marginTop: 2
                }}
            >
                {
                    showInsights &&
                    <View>
                        <DailyFinanceChart />
                        <TextInsight text={averageRevenuePerWorkingDay} />
                    </View>
                }
                {
                    !showInsights &&
                    <NoRevenueWarning text='Nenhuma receita cadastrada este mês.' />
                }
            </Animated.View>
        </>
    )

}