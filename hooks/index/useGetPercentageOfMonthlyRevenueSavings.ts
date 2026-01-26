import { DocsContext } from '@/context/DocsContext'
import { getPercentageOfMonthlyRevenueSavingsUseCase } from '@/services/index/getPercentageOfMonthlyRevenueSavingsUseCase'
import { useContext } from 'react'

export default function useGetPercentageOfMonthlyRevenueSavings() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return getPercentageOfMonthlyRevenueSavingsUseCase(entries, outflows, selectedMonth, currentYear)

}