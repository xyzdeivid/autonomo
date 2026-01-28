import { Entry as Scheduling } from '@/types/index'

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
                day.amount += scheduling.serviceValue
            }
        })
    })

    return formatDays

}

export const thereIsProduct = (schedulings: Scheduling[]) => {
    const product = schedulings.filter(scheduling => (
        scheduling.serviceCategory === 'product'
    ))[0]
    if (product) return true
    return false
}

export const thereIsService = (schedulings: Scheduling[]) => {
    const service = schedulings.filter(scheduling => (
        scheduling.serviceCategory === 'service'
    ))[0]
    if (service) return true
    return false
}

export const thereIsBudget = (schedulings: Scheduling[]) => {
    const budget = schedulings.filter(scheduling => (
        scheduling.serviceCategory === 'budget'
    ))[0]
    if (budget) return true
    return false
}

export const getAvailableYears = (entries: Scheduling[]) => {

    let years = [String(new Date().getFullYear())]

    years.push(...entries.map(entry => entry.date.split('-')[0]))

    years = [...new Set(years)]

    return years.length > 1
        ? years.sort((a, b) => Number(b) - Number(a))
        : years

}

export function getMonthNameByMonthNumber(monthNumber: number) {

    switch (monthNumber) {
        case 1:
            return 'Janeiro'
        case 2:
            return 'Fevereiro'
        case 3:
            return 'Março'
        case 4:
            return 'Abril'
        case 5:
            return 'Maio'
        case 6:
            return 'Junho'
        case 7:
            return 'Julho'
        case 8:
            return 'Agosto'
        case 9:
            return 'Setembro'
        case 10:
            return 'Outubro'
        case 11:
            return 'Novembro'
        case 12:
            return 'Dezembro'
    }

}