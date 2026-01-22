import { Item } from '@/types/index'

export const sortItems = (items: Item[]) => {

    return items.sort((a, b) => b.value - a.value)

}

// Retornando orçamentos junto com 
// serviços pois são mostrados juntos na lista
export const getItemsByCategory = (items: Item[], category: string) => {

    switch (category) {
        case 'product':
            return items.filter(current =>
                current.category === 'product'
            )
        case 'service':
            return items.filter(current =>
                current.category !== 'product'
            )
        case 'budget':
            return items.filter(current =>
                current.category !== 'product'
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