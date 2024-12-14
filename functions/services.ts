import { Item, Outflow } from '@/context/DocsContext'
import { generateId } from './common'
import { Alert } from 'react-native'

export const orderServices = (services: Item[]) => {

    return services.sort((a, b) => b.value - a.value)

}

export const checkServicesAmount = (services: Item[], service: Item) => {

    const servicesAmount = services.filter(current => {
        return current.category === service.category
    }).length

    if (servicesAmount === 8) {
        return false
    }

    return true

}

export const getServicesByCategory = (services: Item[], category: string) => {

    switch (category) {
        case 'product':
            return services.filter(service =>
                service.category === 'product'
            )
        case 'service':
            return services.filter(service =>
                service.category === 'service'
            )
        case 'budget':
            return services.filter(service =>
                service.category === 'budget'
            )
        default:
            return []
    }

}

export const getCategoryAndSet = (
    items: Item[],
    setCategory: React.Dispatch<React.SetStateAction<string>>
) => {
    if (items[0]) {
        setCategory(items[0].category)
    }
}

export const checkAllInputs = (
    choice: string, name: string,
    value: number, amount: number,
    resale: boolean, stock: boolean
): boolean => {

    switch (choice) {

        case 'product':

            if (resale || stock) {
                if (name && value && amount) return true
            } else {
                if (name && value) return true
            }
            return false

        case 'service':

            if (name && value) return true
            return false

        case 'budget':

            if (name) return true
            return false

        default:
            return false

    }

}

export const createNewService = (
    choice: string, name: string,
    value: number, amount: number,
    isThereAmount: boolean, resale: boolean
) => {
    const service: Item = {
        category: choice,
        _id: name,
        value,
        isThereAmount,
        resale
    }
    if (service.isThereAmount) service.amount = amount
    return service
}

export const checkIfThereIsAnotherService = (services: Item[], name: string): boolean => {

    const isThereAnotherService = services.filter(service => {
        const serviceName = service._id.toLocaleLowerCase()
        const nameToCompare = name.toLocaleLowerCase()
        return serviceName === nameToCompare
    })[0]

    return isThereAnotherService
        ? true
        : false

}

export const checkTitle = (item: string) => {
    switch (item) {
        case 'service':
            return 'Serviço'
        case 'product':
            return 'Produto'
        case 'budget':
            return 'Orçamentário'
    }
}

export const createNewOutflow = (
    valueChoice: string,
    purchaseValue: number,
    amount: number,
    name: string,
    purchaseDate: string
) => {

    const newExpenseValue =
        valueChoice === 'total' ? purchaseValue : purchaseValue * amount

    const newExpense: Outflow = {
        _id: generateId(),
        name,
        date: purchaseDate,
        value: newExpenseValue,
        amount
    }

    return newExpense

}