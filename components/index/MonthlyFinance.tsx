import { useContext } from 'react'

import { MonthlyFinanceChart } from './MonthlyFinanceChart'

import { DocsContext } from '@/context/DocsContext'

import { filterExpensesByMonth, filterIncomesByMonth } from '@/rules/domainRules'

export function MonthlyFinance() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth

    const filteredIncomes = filterIncomesByMonth(entries, selectedMonth, currentYear)
    const filteredExpenses = filterExpensesByMonth(outflows, selectedMonth, currentYear)

    return (
        <MonthlyFinanceChart
            filteredSchedulings={filteredIncomes}
            filteredExpenses={filteredExpenses}
        />
    )

}