import { Expense, Service } from '@/context/DocsContext'

export const orderExpenses = (expenses: Expense[]) => {

    return expenses.sort((a, b) => a.date.localeCompare(b.date)).reverse()

}

export const isThereAnotherService = (services: Service[], target: Service) => {
    const service = services.filter(current => {
        return current._id === target._id
    })
    if (service[0]) {
        return true
    }
    return false
}

export const takeExistingService = (services: Service[], id: string) => {

    return services.filter(current => {
        return current._id === id
    })[0]

}

export const takeRemainingServices = (services: Service[], service: Service) => {
    return services.filter(current => {
        return current._id !== service._id
    })
}