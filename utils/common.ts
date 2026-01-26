import { Outflow, Entry } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { Alert } from 'react-native'

export function isStockValid(stock: number): boolean {

    return stock >= 0

}

export const moneyFormat = (value: number) => {
    const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(Number(value)).replace('R$', '').trim()
    return formatedData
}

export function getErrorMessage(error: string): string {

    switch (error) {

        case 'INVALID_FIELD':
            return 'Campo vazio ou inválido.'

        case 'DUPLICATE_ITEM':
            return 'Já existe um item com esse nome.'

        case 'DB_ERROR':
            return 'Erro ao acessar banco de dados.'

        case 'FUTURE_DATE':
            return 'Não é possível registrar em datas futuras.'

        case 'INSUFFICIENT_STOCK':
            return 'Estoque insuficiente.'

        case 'INVALID_VALUE':
            return 'Valor inválido.'

        case 'INVALID_STOCK':
            return 'Estoque inválido.'

        case 'INVALID_NAME':
            return 'Nome inválido.'

        default:
            return 'Erro não tratado'

    }

}

export function isTodayOrPast(date: string) {

    const inputDate = new Date(date + 'T00:00:00')

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return inputDate <= today

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

export const filterSchedulings = (schedulings: Entry[], selectedMonth: number, currentYear: string) => {
    return schedulings.filter(current => {
        return Number(current.date.split('-')[1]) === selectedMonth
            && current.date.split('-')[0] === currentYear

    })
}

export const filterExpenses = (expenses: Outflow[], selectedMonth: number, currentYear: string) => {
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
    entries: Entry[],
    expenses: Outflow[],
    currentYear: string,
    months: [string, number][]
) => {

    const entriesAndExpenses: (Entry | Outflow)[] = []

    if (entries[0]) {
        entriesAndExpenses.push(...entries)
    }

    if (expenses[0]) {
        entriesAndExpenses.push(...expenses)
    }

    const yearEntriesAndExpenses = entriesAndExpenses.filter(entry => (
        entry.date.split('-')[0] === currentYear
    ))

    const availableMonths = [...new Set(yearEntriesAndExpenses.map(entry => (
        entry.date.split('-')[1]
    )))]

    const monthsToGetAvailable: [string, number][] = []

    for (const availableMonth of availableMonths) {
        const month = months.find(month => month[1] === Number(availableMonth))
        if (month) {
            monthsToGetAvailable.push(month)
        }
    }

    if (!monthsToGetAvailable[0]) {

        const currentMonthIndex = new Date().getMonth() + 1
        const currentMonth = months.find(month => month[1] === currentMonthIndex)

        if (currentMonth) {
            monthsToGetAvailable.push(currentMonth)
        }

    }

    return monthsToGetAvailable.sort((a, b) => Number(a[1]) - Number(b[1]))

}

export const warning = (
    warningText: string,
    setLoadingScreen: (value: React.SetStateAction<boolean>) => void
) => {

    Alert.alert(warningText)
    setLoadingScreen(false)

}
export function showErrorAtSubmitData(erro: string | undefined): void {
    Alert.alert('Erro', erro ? getErrorMessage(erro) : 'Erro desconhecido.')
}

export function formatDateToISO(date: Date): string {
    return date.toISOString().split('T')[0]
}