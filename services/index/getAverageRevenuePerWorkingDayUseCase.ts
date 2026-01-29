import { filterIncomesByMonth } from '@/rules/domainRules'
import { calculateAverageRevenuePerWorkingDay } from '@/rules/indexRules'
import { Entry } from '@/types'

export function getAverageRevenuePerWorkingDayUseCase(entries: Entry[], month: number, year: string): number {

    const monthlyEntries = filterIncomesByMonth(entries, month, year)

    return calculateAverageRevenuePerWorkingDay(monthlyEntries)

}