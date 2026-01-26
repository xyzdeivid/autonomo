import { filterExpensesByMonth, filterIncomesByMonth } from '@/rules/domainRules'
import { calculateMonthlyProfit } from '@/rules/indexRules'
import { Entry, Outflow } from '@/types'

export function getMonthlyProfitUseCase(entries: Entry[], outflows: Outflow[], month: number, year: string) {

    const monthlyEntries = filterIncomesByMonth(entries, month, year)
    const monthlyOutflows = filterExpensesByMonth(outflows, month, year)

    return calculateMonthlyProfit(monthlyEntries, monthlyOutflows)

}