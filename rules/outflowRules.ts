import { isStockValid, isStringValid, isTodayOrPast } from '@/utils/common'
import { CanDo, Outflow } from '@/types'

function areAllTheFieldsCorrect(outflow: Outflow): boolean {

    if (typeof outflow._id !== 'string' || !isStringValid(outflow._id)) return false
    if (typeof outflow.name !== 'string' || !isStringValid(outflow.name)) return false
    if (typeof outflow.date !== 'string' || !isStringValid(outflow.date)) return false
    if (typeof outflow.value !== 'number') return false
    if (outflow.amount != null && typeof outflow.amount !== 'number') return false

    return true

}

export function isStockIntegrate(outflow: Outflow): boolean {

    if (outflow.amount) return true

    return false

}

export function newProductStock(currentStock: number, integrateAmount: number): number {

    return currentStock + integrateAmount

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