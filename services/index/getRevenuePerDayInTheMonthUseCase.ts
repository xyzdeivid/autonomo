import { filterIncomesByMonth } from '@/rules/domainRules'
import { getRevenuePerDayInTheMonth } from '@/rules/indexRules'
import { Entry } from '@/types'

export function getRevenuePerDayInTheMonthUseCase(entries: Entry[], month: number, year: string) {

    const monthEntries = filterIncomesByMonth(entries, month, year)

    return getRevenuePerDayInTheMonth(monthEntries)

}