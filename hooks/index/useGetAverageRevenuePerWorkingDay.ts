import { DocsContext } from '@/context/DocsContext'
import { getAverageRevenuePerWorkingDayUseCase } from '@/services/index/getAverageRevenuePerWorkingDayUseCase'
import { useContext } from 'react'

export function useGetAverageRevenuePerWorkingDay(): number {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [month] = appDocs.selectedMonth
    const [year] = appDocs.currentYear

    return getAverageRevenuePerWorkingDayUseCase(entries, month, year)

}