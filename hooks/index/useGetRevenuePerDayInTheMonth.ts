import { DocsContext } from '@/context/DocsContext'
import { getRevenuePerDayInTheMonthUseCase } from '@/services/index/getRevenuePerDayInTheMonthUseCase'
import { useContext } from 'react'

export function useGetRevenuePerDayInTheMonth() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return getRevenuePerDayInTheMonthUseCase(entries, selectedMonth, currentYear)

}