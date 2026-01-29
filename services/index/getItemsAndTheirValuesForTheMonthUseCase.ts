import { filterIncomesByMonth } from '@/rules/domainRules'
import { calculateItemsAndTheirValuesForTheMonth } from '@/rules/indexRules'
import { Entry } from '@/types'

export function getItemsAndTheirValuesForTheMonth(entries: Entry[], month: number, year: string) {

    const monthEntries = filterIncomesByMonth(entries, month, year)

    return calculateItemsAndTheirValuesForTheMonth(monthEntries)

}