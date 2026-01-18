import { Item } from '@/types'

function isThereAnotherItem(items: Item[], name: string) {

    const isThereAnotherItem = items.find(item =>
        item._id.toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    return isThereAnotherItem
        ? true
        : false

}

export function canAddItem(items: Item[], item: Item): { valid: boolean, reason?: string } {

    // Verificando se existe outro item com o mesmo nome
    const anotherItem = isThereAnotherItem(items, item._id)
    if (anotherItem) return {
        valid: false, reason: 'DUPLICATE_ITEM'
    }

    return {
        valid: true
    }

}

export function needResaleOutflow(item: Item): boolean {

    return !!item.resale

}