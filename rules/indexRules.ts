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

type CalculateRankingOfItemsWithHighestRevenue = { productName: string, totalRevenue: number }[]

export function calculateItemsAndTheirValuesForTheMonth(
    entries: Entry[]
): CalculateRankingOfItemsWithHighestRevenue {

    const itemsAndTheirValues: CalculateRankingOfItemsWithHighestRevenue = [] as
        CalculateRankingOfItemsWithHighestRevenue

    for (const entry of entries) {

        // Verificando se já foi colocado em array
        if (itemsAndTheirValues.some(value => value.productName === entry.serviceId)) {
            for (const service of itemsAndTheirValues) {
                if (service.productName === entry.serviceId) service.totalRevenue += entry.serviceValue
            }
        } else {
            itemsAndTheirValues.push({ productName: entry.serviceId, totalRevenue: entry.serviceValue })
        }

    }

    return itemsAndTheirValues

}

export function getOnlyRevenuesWithCustomers(entries: Entry[]): Entry[] {

    return entries.filter(current => current.customer !== undefined)

}

type CalculateCustomersAndTheirRevenueForTheMonth = { customerName: string, totalRevenue: number }[]

export function calculateCustomersAndTheirRevenueForTheMonth(entries: Entry[]): CalculateCustomersAndTheirRevenueForTheMonth | [] {

    const customers: CalculateCustomersAndTheirRevenueForTheMonth = [] as
        CalculateCustomersAndTheirRevenueForTheMonth

    for (const entry of entries) {

        if (entry.customer !== undefined) {

            if (customers.some(current => current.customerName === entry.customer)) {

                for (const customer of customers) {

                    if (customer.customerName === entry.customer) customer.totalRevenue += entry.serviceValue

                }

            } else {

                customers.push({ customerName: entry.customer, totalRevenue: entry.serviceValue })

            }
        }

    }

    if (customers.length === 0) return []

    return customers

}

type CalculateAmountPerItemPerMonth = { itemName: string, amount: number }[]

export function calculateAmountPerItemPerMonth(entries: Entry[]): CalculateAmountPerItemPerMonth | [] {

    const items: CalculateAmountPerItemPerMonth = [] as CalculateAmountPerItemPerMonth

    for (const entry of entries) {

        if (items.some(current => current.itemName === entry.serviceId)) {

            for (const item of items) {

                if (item.itemName === entry.serviceId) item.amount += entry.serviceCategory === 'product' && entry.serviceAmount !== undefined ? entry.serviceAmount : 1

            }

        } else {

            items.push({ itemName: entry.serviceId, amount: entry.serviceCategory === 'product' && entry.serviceAmount !== undefined ? entry.serviceAmount : 1 })

        }

    }

    if (items.length === 0) return []

    return items

}

type GetRevenuePerDayInTheMonth = { day: string, value: number }[]

export function getRevenuePerDayInTheMonth(
    entries: Entry[]
): GetRevenuePerDayInTheMonth {

    if (entries.length === 0) return []

    const revenueMap: Record<string, number> = {}
    let lastDay = 0

    for (const entry of entries) {
        const day = entry.date.slice(-2)
        const dayNumber = Number(day)

        revenueMap[day] = (revenueMap[day] ?? 0) + entry.serviceValue

        if (dayNumber > lastDay) lastDay = dayNumber
    }

    const result: GetRevenuePerDayInTheMonth = []

    for (let day = 1; day <= lastDay; day++) {
        const dayStr = String(day).padStart(2, '0')

        result.push({
            day: dayStr,
            value: revenueMap[dayStr] ?? 0
        })
    }

    return result
}