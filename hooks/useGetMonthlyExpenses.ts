import { DocsContext } from '@/context/DocsContext'
import { getMonthlyExpensesUseCase } from '@/services/getMonthlyExpensesUseCase'
import { useContext } from 'react'

export default function useGetMonthlyExpenses() {

    const appDocs = useContext(DocsContext)
    const [outflows] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return getMonthlyExpensesUseCase(outflows, selectedMonth, currentYear)

}