import { isTodayOrPast } from '@/functions/common'
import { Outflow } from '@/types'

export function isStockIntegrate(outflow: Outflow): boolean {

    if (outflow.amount) return true

    return false

}

export function newProductStock(currentStock: number, integrateAmount: number): number {

    return currentStock + integrateAmount

}

export function canAddOutflow(outflowDate: string): { valid: boolean, reason?: string } {

    // Verificando se foi criado em data futura
    const todayOrPast = isTodayOrPast(outflowDate)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}