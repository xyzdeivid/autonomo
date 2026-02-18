import { DocsContext } from '@/context/DocsContext'
import { filterExpensesByMonth, filterIncomesByMonth } from '@/rules/domainRules'
import { useContext } from 'react'

export function useShowAnyInfoWarning() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const monthEntries = filterIncomesByMonth(entries, selectedMonth, currentYear)
    const monthOutflows = filterExpensesByMonth(outflows, selectedMonth, currentYear)

    return monthEntries.length === 0 && monthOutflows.length === 0

}