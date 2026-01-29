import { Entry, Outflow } from '@/types'

export function calculateMonthlyIncome(entries: Entry[]): number {
    return entries.reduce((prev, current) => {
        return prev + current.serviceValue
    }, 0)
}

export function calculateMonthlyExpenses(outflows: Outflow[]): number {
    return outflows.reduce((prev, current) => {
        return prev + current.value
    }, 0)
}

export function calculateMonthlyProfit(entries: Entry[], outflows: Outflow[]): number {
    return calculateMonthlyIncome(entries) - calculateMonthlyExpenses(outflows)
}

export function calculatePercentageOfMonthlyRevenueSavings(entries: Entry[], outflows: Outflow[]): number {

    const monthlyIncome = calculateMonthlyIncome(entries)
    const monthlyProfit = calculateMonthlyProfit(entries, outflows)

    return Number(((monthlyProfit * 100) / monthlyIncome).toFixed(2))

}

export function calculateAverageRevenuePerWorkingDay(monthlyEntries: Entry[]): number {

    let daysWorked = monthlyEntries.map(entry => entry.date.slice(-2))
    daysWorked = [...new Set(daysWorked)]

    const monthlyIncome = calculateMonthlyIncome(monthlyEntries)

    return monthlyIncome / daysWorked.length

}