import { DailyFinanceChart } from './DailyFinanceChart'
import { FinanceChartContainer } from './FinanceChartContainer'
import { TextInsight } from './TextInsight'
import { useGetAverageRevenuePerWorkingDayText } from '@/hooks/index/useGetAverageRevenuePerWorkingDayText'

export function DailyFinanceContent() {

    const averageRevenuePerWorkingDay = useGetAverageRevenuePerWorkingDayText()

    return (
        <>
            <FinanceChartContainer>
                <DailyFinanceChart />
            </FinanceChartContainer>
            <TextInsight text={averageRevenuePerWorkingDay} />
        </>
    )

}