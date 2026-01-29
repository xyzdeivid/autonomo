import { DailyFinanceChart } from './DailyFinanceChart'
import { FinanceChartContainer } from './FinanceChartContainer'
import { TextInsight } from './TextInsight'
import { useGetAverageRevenuePerWorkingDayText } from '@/hooks/index/useGetAverageRevenuePerWorkingDayText'
import { Info } from './Info'

interface DailyFinanceContentProps {
    comingFrom: string
}

export function DailyFinanceContent({ comingFrom }: DailyFinanceContentProps) {

    const averageRevenuePerWorkingDay = useGetAverageRevenuePerWorkingDayText()

    return (
        <>
        <Info text='Receita de cada dia do mês.' />
            <FinanceChartContainer>
                <DailyFinanceChart comingFrom={comingFrom} />
            </FinanceChartContainer>
            <TextInsight text={averageRevenuePerWorkingDay} />
        </>
    )

}