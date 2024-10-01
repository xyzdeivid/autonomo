import { Expense, Scheduling } from "@/context/DocsContext"
import { format, parseISO } from "date-fns"

export const moneyFormat = (value: number) => {
    const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(Number(value)).replace('R$', '')
    return formatedData
}

export const dateFormat = (date: string) => {
    const formatedDate = format(parseISO(date), 'dd/MM')
    return formatedDate
}

export const getCurrentMonth = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')
    return `${currentYear}-${currentMonth}`
}

export const filterSchedulings = (schedulings: Scheduling[], selectedMonth: number) => {
    return schedulings.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth + 1
    })
}

export const filterExpenses = (expenses: Expense[], selectedMonth: number) => {
    return expenses.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth + 1
    })
}

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
}