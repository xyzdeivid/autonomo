import { DocsContext } from '@/context/DocsContext'
import { getItemsAndTheirAmountForTheMonthUseCase } from '@/services/index/getItemsAndTheirAmountForTheMonthUseCase'
import { useContext } from 'react'

export function useGetItemsAndTheirAmountForTheMonth() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const itemsAndTheirAmount = getItemsAndTheirAmountForTheMonthUseCase(entries, selectedMonth, currentYear)

    return itemsAndTheirAmount.sort((a, b) => b.amount - a.amount)

}