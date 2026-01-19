import { isTodayOrPast } from '@/functions/common'
import { CanDo, Item, Outflow } from '@/types'

function isThereAnotherItem(items: Item[], name: string) {

    const isThereAnotherItem = items.find(item =>
        item._id.toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    return isThereAnotherItem
        ? true
        : false

}


export function canAddItem(items: Item[], itemId: string, resaleOutflow?: Outflow): CanDo {

    // Verificando se existe outro item com o mesmo nome
    const anotherItem = isThereAnotherItem(items, itemId)
    if (anotherItem) return {
        valid: false, reason: 'DUPLICATE_ITEM'
    }

    // Verificando se caso revenda, tenha sido criado em data futura
    if (resaleOutflow) {

        const todayOrPast = isTodayOrPast(resaleOutflow.date)

        // Retornando erro caso revenda tenha sido criada em data futura
        if (!todayOrPast) return {
            valid: false, reason: 'FUTURE_DATE'
        }

    }

    return {
        valid: true
    }

}

export function needResaleOutflow(item: Item): boolean {

    return !!item.resale

}

export function canEditItemName(items: Item[], newName: string): CanDo {

    // Verificando se existe algum outro serviço com o mesmo nome
    if (items.find(current => current._id === newName)) return { valid: false, reason: 'DUPLICATE_ITEM' }

    return {
        valid: true
    }

}