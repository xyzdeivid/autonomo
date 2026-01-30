import { DocsContext } from '@/context/DocsContext'
import { getCustomersAndTheirRevenueForTheMonthUseCase } from '@/services/index/getCustomersAndTheirRevenueForTheMonthUseCase'
import { useContext } from 'react'

export function useGetCustomersAndTheirRevenueForTheMonth() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const customerAndTheirValues = getCustomersAndTheirRevenueForTheMonthUseCase(entries, selectedMonth, currentYear)

    return customerAndTheirValues.sort((a, b) => b.totalRevenue - a.totalRevenue)

}