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