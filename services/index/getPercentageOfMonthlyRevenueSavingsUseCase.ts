import { filterExpensesByMonth, filterIncomesByMonth } from '@/rules/domainRules'
import { Entry, Outflow } from '@/types'
import { calculatePercentageOfMonthlyRevenueSavings } from '@/rules/indexRules'

export function getPercentageOfMonthlyRevenueSavingsUseCase(entries: Entry[], outflows: Outflow[], month: number, year: string) {

    const monthlyEntries = filterIncomesByMonth(entries, month, year)
    const monthlyOutflows = filterExpensesByMonth(outflows, month, year)

    return calculatePercentageOfMonthlyRevenueSavings(monthlyEntries, monthlyOutflows)

}