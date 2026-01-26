import { DocsContext } from '@/context/DocsContext'
import { filterSchedulings } from '@/utils/common'
import { orderSchedulings } from '@/utils/schedulings'
import { useContext } from 'react'

export default function useGetMonthEntries() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    let filteredEntriesByMonth = filterSchedulings(entries, selectedMonth, currentYear)
    filteredEntriesByMonth = orderSchedulings(filteredEntriesByMonth)

    return filteredEntriesByMonth

}