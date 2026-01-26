import { DocsContext } from '@/context/DocsContext'
import { filterExpenses } from '@/utils/common'
import { orderExpenses } from '@/utils/expenses'
import { useContext } from 'react'

export default function useGetExpensesToShowOnTheList() {

    const appDocs = useContext(DocsContext)
    const [outflows] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    let filteredExpensesByMonth = filterExpenses(outflows, selectedMonth, currentYear)

    filteredExpensesByMonth = orderExpenses(filteredExpensesByMonth)

    return filteredExpensesByMonth

}