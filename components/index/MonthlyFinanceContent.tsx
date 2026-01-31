import { MonthlyFinanceChart } from './MonthlyFinanceChart'
import { useGetPercentageOfSavingsText } from '@/hooks/index/useGetPercentageOfSavingsText'
import { TextInsight } from './TextInsight'
import { Info } from './Info'
import { useEffect } from 'react'
import { useShowMonthTextInsights } from '@/hooks/index/useShowMonthTextInsight'

interface MonthlyFinanceContentProps {
    setComingFrom: React.Dispatch<React.SetStateAction<number>>
}

export function MonthlyFinanceContent({ setComingFrom }: MonthlyFinanceContentProps) {

    useEffect(() => {
        setComingFrom(0)
    }, [setComingFrom])

    const percentageOfSavingsText = useGetPercentageOfSavingsText()
    const showMonthTextInsights = useShowMonthTextInsights()

    return (
        <>
            <Info text='Balanço financeiro do mês.' />
                <MonthlyFinanceChart />
            {
                showMonthTextInsights && <TextInsight text={percentageOfSavingsText} />
            }
        </>
    )

}