import { filterExpensesByMonth } from '@/rules/domainRules'
import { calculateMonthlyExpenses } from '@/rules/indexRules'
import { Outflow } from '@/types'

export function getMonthlyExpensesUseCase(outflows: Outflow[], month: number, year: string) {

    const monthExpenses = filterExpensesByMonth(outflows, month, year)

    const expense = calculateMonthlyExpenses(monthExpenses)

    return expense

}