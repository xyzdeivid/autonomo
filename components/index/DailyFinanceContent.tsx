import { DailyFinanceChart } from './DailyFinanceChart'
import { TextInsight } from './TextInsight'
import { useGetAverageRevenuePerWorkingDayText } from '@/hooks/index/useGetAverageRevenuePerWorkingDayText'
import { Info } from './Info'
import { useEffect } from 'react'

interface DailyFinanceContentProps {
    comingFrom: number
    setComingFrom: React.Dispatch<React.SetStateAction<number>>
}

export function DailyFinanceContent({ comingFrom, setComingFrom }: DailyFinanceContentProps) {

    useEffect(() => {
        setComingFrom(1)
    }, [setComingFrom])

    const averageRevenuePerWorkingDay = useGetAverageRevenuePerWorkingDayText()

    return (
        <>
            <Info text='Quanto você ganhou em cada dia do mês.' />
            <DailyFinanceChart comingFrom={comingFrom} />
            <TextInsight text={averageRevenuePerWorkingDay} />
        </>
    )

}