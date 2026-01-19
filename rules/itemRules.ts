import { CanDo, Item, Outflow } from '@/types'
import { canAddOutflow } from './outflowRules'
import { isStockValid, isStringValid } from '@/utils/common'

function hasEmptyField(item: Item): boolean {

    if (item._id == null || !isStringValid(item._id)) return true
    if (item.category == null || !isStringValid(item.category)) return true
    if (item.value == null) return true
    if (item.resale == null) return true
    if (item.isThereAmount == null) return true
    if (item.isThereAmount) {
        if (item.amount == null) {
            return true
        }
    }

    return false

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

export function canAddItem(items: Item[], item: Item, resaleOutflow?: Outflow): CanDo {

    // Verificando se há campo vazio obrigatório
    const emptyField = hasEmptyField(item)
    if (emptyField) return {
        valid: false, reason: 'EMPTY_FIELD'
    }

    // Verificando se existe outro item com o mesmo nome
    const anotherItem = hasAnotherItem(items, item._id)
    if (anotherItem) return {
        valid: false, reason: 'DUPLICATE_ITEM'
    }

    // Verificando se estoque é valido caso tenha sido produto
    if (item.isThereAmount) {
        if (!isStockValid(item.amount!)) {
            return { valid: false, reason: 'INVALID_STOCK' }
        }
    }

    // Verificando se valor é válido
    const valueValid = isValueValid(item.category, item.value)
    if (!valueValid) return {
        valid: false, reason: 'INVALID_VALUE'
    }


    // Verificando despesa criada, caso seja uma revenda
    if (resaleOutflow) {

        const addOutflow = canAddOutflow(resaleOutflow)

        if (!addOutflow.valid) return addOutflow

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