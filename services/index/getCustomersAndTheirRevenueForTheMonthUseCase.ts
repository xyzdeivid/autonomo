import { filterIncomesByMonth } from '@/rules/domainRules'
import { calculateCustomersAndTheirRevenueForTheMonth } from '@/rules/indexRules'
import { Entry } from '@/types'

export function getCustomersAndTheirRevenueForTheMonthUseCase(entries: Entry[], month: number, year: string) {

    const monthEntries = filterIncomesByMonth(entries, month, year)

    return calculateCustomersAndTheirRevenueForTheMonth(monthEntries)

}