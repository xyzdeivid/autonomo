import { isTodayOrPast } from '@/functions/common'
import { CanDo, Entry, Item } from '@/types'

function isStockEnough(selectedProductStock: number, amountPurchased: number): boolean {

    return selectedProductStock >= amountPurchased

}

export function canAddEntry(entry: Entry, selectedProduct?: Item): CanDo {

    // Verificando se foi criado em data futura
    const todayOrPast = isTodayOrPast(entry.date)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    // Verificando se estoque é o suficiente caso receita tenha sido produto
    if (
        entry.serviceCategory === 'product'
        && selectedProduct?.amount
        && entry.serviceAmount
    ) {

        const stockEnough = isStockEnough(selectedProduct.amount, entry.serviceAmount)
        if (!stockEnough) return {
            valid: false, reason: 'INSUFFICIENT_STOCK'
        }

    }

    return {
        valid: true
    }

}

export function needReduceStock(entry: Entry): boolean {

    return !!entry.serviceAmount

}

export function newProductStock(currentStock: number, reduceAmount: number): number {

    return currentStock - reduceAmount

}

export function canEditEntryDate(newDate: string):CanDo  {

    // Verificando se data editada é futura
    const todayOrPast = isTodayOrPast(newDate)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}