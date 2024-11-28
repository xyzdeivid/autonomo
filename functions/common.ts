import { Expense, Scheduling } from '@/context/DocsContext'
import { format, parseISO } from 'date-fns'

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

export const filterSchedulings = (schedulings: Scheduling[], selectedMonth: number, currentYear: string) => {
    return schedulings.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth
            && current.date.split('-')[0] === currentYear

    })
}

export const filterExpenses = (expenses: Expense[], selectedMonth: number, currentYear: string) => {
    return expenses.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth
            && current.date.split('-')[0] === currentYear
    })
}

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
}

export const getMonthName = (months: [string, number][], selectedMonth: number) => {

    const month = months.find(month => month[1] === selectedMonth)

    return month
        ? month[0]
        : ''

}

export const getAvailableMonths = (
    entries: Scheduling[],
    currentYear: string,
    months: [string, number][]
) => {

    const yearEntries = entries.filter(entry => (
        entry.date.split('-')[0] === currentYear
    ))

    const availableMonths = [...new Set(yearEntries.map(entry => (
        entry.date.split('-')[1]
    )))]

    const monthsToGetAvailable: [string, number][] = []

    for (const availableMonth of availableMonths) {
        const month = months.find(month => month[1] === Number(availableMonth))
        if (month) {
            monthsToGetAvailable.push(month)
        }
    }

    return monthsToGetAvailable.sort((a, b) => Number(a[1]) - Number(b[1]))

}