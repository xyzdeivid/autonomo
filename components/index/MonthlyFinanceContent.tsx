import { FinanceChartContainer } from './FinanceChartContainer'
import { MonthlyFinanceChart } from './MonthlyFinanceChart'
import { useGetPercentageOfSavingsText } from '@/hooks/index/useGetPercentageOfSavingsText'
import { TextInsight } from './TextInsight'
import { Info } from './Info'
import { useEffect } from 'react'

interface MonthlyFinanceContentProps {
    setComingFrom: React.Dispatch<React.SetStateAction<string>>
}

export function MonthlyFinanceContent({ setComingFrom }: MonthlyFinanceContentProps) {

    useEffect(() => {
        setComingFrom('left')
    }, [setComingFrom])

    const percentageOfSavingsText = useGetPercentageOfSavingsText()

    return (
        <>
            <Info text='Balanço financeiro do mês.' />
            <FinanceChartContainer>
                <MonthlyFinanceChart />
            </FinanceChartContainer>
            <TextInsight text={percentageOfSavingsText} />
        </>
    )

}