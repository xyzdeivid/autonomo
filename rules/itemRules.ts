import { CanDo, Item } from '@/types'
import { isStockValid, isStringValid } from '@/utils/common'

function areAllTheFieldsCorrect(item: Item): boolean {

    if (typeof item._id !== 'string' || !isStringValid(item._id)) return false
    if (typeof item.category !== 'string' || !isStringValid(item.category)) return false
    if (typeof item.value !== 'number') return false
    if (typeof item.resale !== 'boolean') return false
    if (typeof item.isThereAmount !== 'boolean') return false
    if (item.isThereAmount) {
        if (typeof item.amount !== 'number') {
            return false
        }
    }

    return true

}

function hasAnotherItem(items: Item[], name: string): boolean {

    const isThereAnotherItem = items.find(item =>
        item._id.toLocaleLowerCase() === name.toLocaleLowerCase()
    )

    return isThereAnotherItem
        ? true
        : false

}

function isValueValid(category: string, value: number): boolean {
    
    if (category === 'budget') {

        // Categoria orçamento é salvo com valor 0
        if (value !== 0) return false

    } else {

        // Outras categorias só valor positivo
        if (value <= 0) return false

    }

    return true

}

export function canAddItem(items: Item[], item: Item): CanDo {

    // Verificando se há campo vazio ou inválido
    const allTheFieldsCorrect = areAllTheFieldsCorrect(item)
    if (!allTheFieldsCorrect) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    // Verificando se existe outro item com o mesmo nome
    const anotherItem = hasAnotherItem(items, item._id)
    if (anotherItem) return {
        valid: false, reason: 'DUPLICATE_ITEM'
    }

    // Verificando se estoque é valido caso tenha sido produto
    if (item.isThereAmount  && item.amount !== undefined) {
        if (!isStockValid(item.amount)) {
            return { valid: false, reason: 'INVALID_STOCK' }
        }
    }

    // Verificando se valor é válido
    const valueValid = isValueValid(item.category, item.value)
    if (!valueValid) return {
        valid: false, reason: 'INVALID_VALUE'
    }

    return {
        valid: true
    }

}

export function needResaleOutflow(item: Item): boolean {

    return !!item.resale

}

export function canEditItemName(items: Item[], newName: string): CanDo {

    // Verificando se nome não é vazio
    if (!isStringValid(newName)) {
        return { valid: false, reason: 'INVALID_NAME' }
    }

    // Verificando se existe algum outro serviço com o mesmo nome
    if (items.find(current => current._id === newName)) return { valid: false, reason: 'DUPLICATE_ITEM' }

    return {
        valid: true
    }

}