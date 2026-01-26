import { Item } from '@/types/index'

export function sortItems(items: Item[]): Item[] {
    return items.sort((a, b) => b.value - a.value)
}

export function createNewService(
    choice: string, name: string,
    value: number, amount: number,
    isThereAmount: boolean, resale: boolean
): Item {
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

export function getCategoryOnTheFirstRun(items: Item[]): string {

    if (items.length > 0) {

        // deixando categoria produtos padrão ao abrir app
        if (items.some(current => current.category === 'product')) return 'product'
        return 'service'

    }

    return ''

}

export function getCategoryOnDeletedItem(items: Item[], deletedItemCategory: string): string {

    let anotherItemWithSameCategory = false

    // orçamentos e serviços estão juntos na lista
    const category = deletedItemCategory === 'budget'
    ? 'service' : deletedItemCategory

    if (deletedItemCategory === 'budget' || deletedItemCategory === 'service') {

        anotherItemWithSameCategory = items.some(current =>
            current.category === 'budget' || current.category === 'service'
        )

    } else {

        anotherItemWithSameCategory = items.some(current =>
            current.category === deletedItemCategory
        )

    }

    if (anotherItemWithSameCategory) return category

    if (items.length > 0) {

        if (items[0].category === 'budget') return 'service'
        return items[0].category

    }

    return ''

}