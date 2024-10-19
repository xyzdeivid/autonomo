import { Scheduling, Expense } from '@/context/DocsContext'
import { getExpenses, getSchedulingsRevenue } from './revenue'

export const getDays = (filteredSchedulings: Scheduling[]) => {

    let days: string[] = []

    // Selecting only days in strings
    days = filteredSchedulings.map(current => {
        return current.date.split('-')[2]
    }).sort((a, b) => parseInt(a) - parseInt(b))

    // not allowing days to repeat themselves
    const uniqueDays = [...new Set(days)]

    // putting in the correct format
    const formatDays = uniqueDays.map(current => {
        return {
            day: current,
            amount: 0
        }
    })

    // incrementing values per day
    formatDays.forEach(day => {
        filteredSchedulings.forEach(scheduling => {
            if (scheduling.date.split('-')[2] === day.day) {
                day.amount += scheduling.service.value
            }
        })
    })

    return formatDays

}

const getData = (schedulings: Scheduling[], expenses: Expense[]) => {
    if (getSchedulingsRevenue(schedulings) < getExpenses(expenses)) {
        return getExpenses(expenses)
    } else {
        return getSchedulingsRevenue(schedulings)
    }
}

export const findGreaterData = (schedulings: Scheduling[], expenses: Expense[]) => {
    const data = getData(schedulings, expenses)
    return data
}

export const thereIsProduct = (schedulings: Scheduling[]) => {
    const product = schedulings.filter(scheduling => (
        scheduling.service.category === 'product'
    ))[0]
    if (product) return true
    return false
}

export const thereIsService = (schedulings: Scheduling[]) => {
    const service = schedulings.filter(scheduling => (
        scheduling.service.category === 'service'
    ))[0]
    if (service) return true
    return false
}

export const thereIsBudget = (schedulings: Scheduling[]) => {
    const budget = schedulings.filter(scheduling => (
        scheduling.service.category === 'budget'
    ))[0]
    if (budget) return true
    return false
}