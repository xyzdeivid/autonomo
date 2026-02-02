import { DocsContext } from '@/context/DocsContext'
import { filterIncomesByMonth } from '@/rules/domainRules'
import { useContext } from 'react'

export function useShowInsights() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const monthEntries = filterIncomesByMonth(entries, selectedMonth, currentYear)

    return monthEntries.some(() => true)

}