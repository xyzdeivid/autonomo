import { isTodayOrPast } from '@/functions/common'
import { Item, Outflow } from '@/types'

function isThereAnotherItem(items: Item[], name: string) {

    const isThereAnotherItem = items.find(item =>
        item._id.toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    return isThereAnotherItem
        ? true
        : false

}


export function canAddItem(items: Item[], item: Item, resaleOutflow?: Outflow): { valid: boolean, reason?: string } {

    // Verificando se existe outro item com o mesmo nome
    const anotherItem = isThereAnotherItem(items, item._id)
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