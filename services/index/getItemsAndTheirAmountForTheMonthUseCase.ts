import { filterIncomesByMonth } from '@/rules/domainRules'
import { calculateAmountPerItemPerMonth } from '@/rules/indexRules'
import { Entry } from '@/types'

export function getItemsAndTheirAmountForTheMonthUseCase(entries: Entry[], month: number, year: string) {

    const monthEntries = filterIncomesByMonth(entries, month, year)

    return calculateAmountPerItemPerMonth(monthEntries)

}