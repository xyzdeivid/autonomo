import { DocsContext } from '@/context/DocsContext'
import { getMonthlyIncomeUseCase } from '@/services/getMonthlyIncomeUseCase'
import { useContext } from 'react'

export default function useGetMonthlyIncome() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return getMonthlyIncomeUseCase(entries, selectedMonth, currentYear)

}