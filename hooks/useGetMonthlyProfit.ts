import { DocsContext } from '@/context/DocsContext'
import { getMonthlyProfitUseCase } from '@/services/getMonthlyProfitUseCase'
import { useContext } from 'react'

export default function useGetMonthlyProfit() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return getMonthlyProfitUseCase(entries, outflows, selectedMonth, currentYear)

}