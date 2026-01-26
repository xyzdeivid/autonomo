import { filterIncomesByMonth } from '@/rules/domainRules'
import { calculateMonthlyIncome } from '@/rules/indexRules'
import { Entry } from '@/types'

export function getMonthlyIncomeUseCase(entries: Entry[], month: number, year: string) {

    const monthEntries = filterIncomesByMonth(entries, month, year)

    const income = calculateMonthlyIncome(monthEntries)

    return income

}