import { Expense, Scheduling } from "@/context/DocsContext"


export const getSchedulingsRevenue = (schedulings: Scheduling[]) => {
    return schedulings.reduce((prev, current) => {
        return prev + current.service.value
    }, 0)
}

export const getExpenses = (expenses: Expense[]) => {
    return expenses.reduce((prev, current) => {
        return prev + current.value
    }, 0)
}

export const getProfit = (schedulings: Scheduling[], expenses: Expense[]) => {
    return getSchedulingsRevenue(schedulings) - getExpenses(expenses)
}