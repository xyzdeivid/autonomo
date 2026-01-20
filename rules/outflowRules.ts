import { isStockValid, isTodayOrPast } from '@/utils/common'
import { CanDo, Outflow } from '@/types'
import { isNewValueValid, isStringValid } from './domainRules'

function areAllTheFieldsCorrect(outflow: Outflow): boolean {

    if (!isStringValid(outflow._id)) return false
    if (!isStringValid(outflow.name)) return false
    if (!isStringValid(outflow.date)) return false
    if (typeof outflow.value !== 'number') return false
    if (outflow.amount != null && typeof outflow.amount !== 'number') return false

    return true

}

/* Função que retorna nova quantidade de estoque do produto
ao criar uma reposição de estoque */
export function newProductStockOnIncrement(currentStock: number, incrementAmount: number): number {
    return currentStock + incrementAmount
}

/* Função que retorna nova quantidade de estoque do produto
ao excluir uma reposição de estoque */
export function newProductStockOnDecrement(currentStock: number, decrementAmount: number): number {
    if (currentStock > 0) return currentStock - decrementAmount
    return currentStock
}

export function canAddOutflow(outflow: Outflow): CanDo {

    // Verificando se há campo vazio ou inválido
    const allTheFieldsCorrect = areAllTheFieldsCorrect(outflow)
    if (!allTheFieldsCorrect) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    // Verificando se foi criado em data futura
    const todayOrPast = isTodayOrPast(outflow.date)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    // Verificando se valor é valido
    if (outflow.value <= 0) return {
        valid: false, reason: 'INVALID_VALUE'
    }

    // Verificando se estoque é válido caso tenha sido reposição
    if (outflow.amount !== undefined) {

        if (!isStockValid(outflow.amount)) return {
            valid: false, reason: 'INVALID_STOCK'
        }

    }

    return {
        valid: true
    }

}

export function canEditOutflowName(name: string): CanDo {

    // Verificando se campo é valido
    const nameValid = isStringValid(name)
    if (!nameValid) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    return {
        valid: true
    }

}

export function canEditOutflowDate(outflowDate: string): CanDo {

    // Verificando se campo é valido
    const validField = isStringValid(outflowDate)
    if (!validField) return {
        valid: false, reason: 'INVALID_FIELD'
    }
    
    // Verificando se data editada é futura
    const todayOrPast = isTodayOrPast(outflowDate)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}

export function canEditOutflowValue(newOutflowValue: number): CanDo {

    // Verificando se campo é válido
    const validField = isNewValueValid(newOutflowValue)
    if (!validField) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    return {
        valid: true
    }

}