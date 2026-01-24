import { Entry, Outflow } from '@/types'

export function isStringValid(string: string): boolean {

    if (typeof string !== 'string' || !(string.trim().length > 0)) return false

    return true

}

export function isNewValueValid(value: number): boolean {

    if (typeof value !== 'number' || value <= 0) return false

    return true

}

export function filterIncomesByMonth(entries: Entry[], selectedMonth: number, currentYear: string): Entry[] {

    return entries.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth
            && current.date.split('-')[0] === currentYear

    })

}

export const filterExpensesByMonth = (outflows: Outflow[], selectedMonth: number, currentYear: string) => {

    return outflows.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth
            && current.date.split('-')[0] === currentYear
    })

}