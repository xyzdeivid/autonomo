import { Item } from '@/types/index'

export const sortItems = (items: Item[]) => {

    return items.sort((a, b) => b.value - a.value)

}

export const getItemsByCategory = (services: Item[], category: string) => {

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