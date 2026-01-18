import { Outflow } from '@/types'

export function isStockIntegrate(outflow: Outflow): boolean {

    if (outflow.amount) return true

    return false

}

export function newProductStock(currentStock: number, integrateAmount: number): number {

    return currentStock + integrateAmount

}