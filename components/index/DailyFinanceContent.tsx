import { DailyFinanceChart } from './DailyFinanceChart'
import { FinanceChartContainer } from './FinanceChartContainer'
import { TextInsight } from './TextInsight'
import { useGetAverageRevenuePerWorkingDayText } from '@/hooks/index/useGetAverageRevenuePerWorkingDayText'
import { Info } from './Info'
import { useEffect } from 'react'

interface DailyFinanceContentProps {
    comingFrom: string
    setComingFrom: React.Dispatch<React.SetStateAction<string>>
}

export function DailyFinanceContent({ comingFrom, setComingFrom }: DailyFinanceContentProps) {

    useEffect(() => {
        setComingFrom('left')
    }, [setComingFrom])

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