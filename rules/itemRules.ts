import { isTodayOrPast } from '@/utils/common'
import { CanDo, Item, Outflow } from '@/types'

function isThereAnotherItem(items: Item[], name: string) {

    const isThereAnotherItem = items.find(item =>
        item._id.toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    return isThereAnotherItem
        ? true
        : false

}

function isValueValid(value: number): boolean {

    return value > 0

}

function isStockValid(stock: number): boolean {

    return stock >= 0

}


export function canAddItem(items: Item[], item: Item, resaleOutflow?: Outflow): CanDo {

    // Verificando se existe outro item com o mesmo nome
    const anotherItem = isThereAnotherItem(items, item._id)
    if (anotherItem) return {
        valid: false, reason: 'DUPLICATE_ITEM'
    }

    // Verificando se valor do item é valido
    const valueValid = isValueValid(item.value)
    if (!valueValid) return {
        valid: false, reason: 'INVALID_VALUE'
    }

    // Verificando se estoque é valido caso tenha sido produto
    if (item.isThereAmount) {

        if (item.amount === undefined || item.amount === null) {
            return { valid: false, reason: 'INVALID_STOCK' }
        }

        if (!isStockValid(item.amount)) {
            return { valid: false, reason: 'INVALID_STOCK' }
        }

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