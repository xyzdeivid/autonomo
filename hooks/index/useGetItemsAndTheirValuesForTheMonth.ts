import { DocsContext } from '@/context/DocsContext'
import { getItemsAndTheirValuesForTheMonth } from '@/services/index/getItemsAndTheirValuesForTheMonthUseCase'
import { useContext } from 'react'

export function useGetItemsAndTheirValuesForTheMonth() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return getItemsAndTheirValuesForTheMonth(entries, selectedMonth, currentYear)

}