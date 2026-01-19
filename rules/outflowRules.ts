import { isStockValid, isStringValid, isTodayOrPast } from '@/utils/common'
import { CanDo, Outflow } from '@/types'

function hasEmptyField(outflow: Outflow): boolean {

    if (outflow._id == null || !isStringValid(outflow._id)) return true
    if (outflow.name == null || !isStringValid(outflow.name)) return true
    if (outflow.date == null || !isStringValid(outflow.date)) return true
    if (outflow.value == null) return true

    return false

}

export function isStockIntegrate(outflow: Outflow): boolean {

    if (outflow.amount) return true

    return false

}

export function newProductStock(currentStock: number, integrateAmount: number): number {

    return currentStock + integrateAmount

}



export function canAddOutflow(outflow: Outflow): CanDo {

    // Verificando se há campo vazio obrigatório
    const emptyField = hasEmptyField(outflow)
    if (emptyField) return {
        valid: false, reason: 'EMPTY_FIELD'
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
    if (outflow.amount != null) {

        if (!isStockValid(outflow.amount)) return {
            valid: false, reason: 'INVALID_STOCK'
        }

    }

    return {
        valid: true
    }

}

export function canEditOutflowDate(outflowDate: string): CanDo {

    // Verificando se data editada é futura
    const todayOrPast = isTodayOrPast(outflowDate)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}