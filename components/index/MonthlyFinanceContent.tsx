import { FinanceChartContainer } from './FinanceChartContainer'
import { MonthlyFinanceChart } from './MonthlyFinanceChart'
import { useGetPercentageOfSavingsText } from '@/hooks/index/useGetPercentageOfSavingsText'
import { TextInsight } from './TextInsight'

export function MonthlyFinanceContent() {

    const percentageOfSavingsText = useGetPercentageOfSavingsText()

    return (
        <>
            <FinanceChartContainer>
                <MonthlyFinanceChart />
            </FinanceChartContainer>
            <TextInsight text={percentageOfSavingsText} />
        </>
    )

}