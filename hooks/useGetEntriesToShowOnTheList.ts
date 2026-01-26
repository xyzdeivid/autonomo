import { DocsContext } from '@/context/DocsContext'
import { filterIncomesByMonth } from '@/rules/domainRules'
import { orderSchedulings } from '@/utils/schedulings'
import { useContext } from 'react'

export default function useGetEntriesToShowOnTheList() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    let filteredEntriesByMonth = filterIncomesByMonth(entries, selectedMonth, currentYear)
    filteredEntriesByMonth = orderSchedulings(filteredEntriesByMonth)

    return filteredEntriesByMonth

}