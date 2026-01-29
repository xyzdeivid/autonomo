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

export function getOnlyServicesAndBudgetsEntries(entries: Entry[]): Entry[] {

    return entries.filter(current => current.serviceCategory === 'service' || current.serviceCategory === 'budget')

}

type CalculateRankingOfItemsWithHighestRevenue = { productName: string, totalRevenue: number }[]

export function calculateItemsAndTheirValuesForTheMonth(
    entries: Entry[]
): CalculateRankingOfItemsWithHighestRevenue {

    const servicesAndBudgets: CalculateRankingOfItemsWithHighestRevenue = [] as 
    CalculateRankingOfItemsWithHighestRevenue

    for (const item of entries) {

        // Verificando se já foi colocado em array
        if (servicesAndBudgets.some(value => value.productName === item.serviceId)) {
            for (const service of servicesAndBudgets) {
                if (service.productName === item.serviceId) service.totalRevenue += item.serviceValue
            }
        } else {
            servicesAndBudgets.push({ productName: item.serviceId, totalRevenue: item.serviceValue })
        }

    }

    return servicesAndBudgets

}