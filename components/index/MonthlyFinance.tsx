import { useContext } from 'react'

import { MonthlyFinanceChart } from './MonthlyFinanceChart'

import { DocsContext } from '@/context/DocsContext'

import FinancePeriodButtons from './FinancePeriodButtons'
import InfoTitle from './InfoTitle'
import { Hr } from './Hr'
import { filterExpensesByMonth, filterIncomesByMonth } from '@/rules/domainRules'

interface MonthlyFinanceProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export function MonthlyFinance({ period, setPeriod }: MonthlyFinanceProps) {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth

    const filteredIncomes = filterIncomesByMonth(entries, selectedMonth, currentYear)
    const filteredExpenses = filterExpensesByMonth(outflows, selectedMonth, currentYear)

    return (
        <>
            <InfoTitle text='Finanças Gerais' />
            {
                filteredIncomes[0] &&
                <FinancePeriodButtons period={period} setPeriod={setPeriod} />
            }
            <Hr />
            <MonthlyFinanceChart
                filteredSchedulings={filteredIncomes}
                filteredExpenses={filteredExpenses}
            />
        </>
    )

}