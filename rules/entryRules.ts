import { isTodayOrPast } from '@/utils/common'
import { CanDo, Entry } from '@/types'
import { isStringValid } from './domainRules'

function areAllTheFieldsCorrect(entry: Entry): boolean {

    if (!isStringValid(entry._id)) return false
    if (!isStringValid(entry.date)) return false
    if (!isStringValid(entry.serviceId)) return false
    if (!isStringValid(entry.serviceCategory)) return false
    if (typeof entry.serviceValue !== 'number') return false
    if (typeof entry.serviceIsThereAmount !== 'boolean') return false

    // Verificando caso campo tenha sido enviado
    if (entry.serviceIsThereAmount === true) {
        if (typeof entry.serviceAmount !== 'number') return false
    }
    if (entry.customer !== undefined) {
        if (!isStringValid(entry.customer)) return false
    }

    return true

}

export function isStockEnough(selectedProductStock: number, amountPurchased: number): boolean {

    return selectedProductStock >= amountPurchased

}

export function canAddEntry(entry: Entry): CanDo {

    // Verificando se todos os campos são válidos
    const allTheFieldsCorrect = areAllTheFieldsCorrect(entry)
    if (!allTheFieldsCorrect) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    // Verificando se foi criado em data futura
    const todayOrPast = isTodayOrPast(entry.date)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}

export function newProductStockOnNewEntry(currentStock: number, reduceAmount: number): number {

    return currentStock - reduceAmount

}

export function canEditCustomerName(customerName: string): CanDo {

    // Verificando se campo é valido
    const editName = isStringValid(customerName)
    if (!editName) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    return {
        valid: true
    }

}

export function canEditEntryDate(newDate: string): CanDo {

    // Verificando se campo é valido
    const validField = isStringValid(newDate)
    if (!validField) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    // Verificando se data editada é futura
    const todayOrPast = isTodayOrPast(newDate)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}

export function newProductStockOnDeleteEntry(currentStock: number, incrementAmount: number): number {

    return currentStock + incrementAmount

}

export function newProductStockOnEditEntryAmount(newAmount: number, oldAmount: number, productAmount: number) {
    return (productAmount + oldAmount) - newAmount
}

export function canEditEntryAmount(newAmount: number, oldAmount: number, productAmount?: number): CanDo {

    // Verificando se campos são válidos
    if (
        typeof newAmount !== 'number'
        || newAmount <= 0
        || typeof oldAmount !== 'number'
    ) return {
        valid: false, reason: 'INVALID_FIELD'
    }
    if (productAmount !== undefined) {
        if (typeof productAmount !== 'number') return {
            valid: false, reason: 'INVALID_FIELD'
        }
    }

    // Verificando se o estoque é suficiente caso o produto não seja por encomenda
    if (productAmount !== undefined) {
        const newProductStock = newProductStockOnEditEntryAmount(newAmount, oldAmount, productAmount)
        if (newProductStock < 0) return {
            valid: false, reason: 'INSUFFICIENT_STOCK'
        }
    }

    return {
        valid: true
    }

}

export function newEntryValueOnEditAmount(productValue: number, oldAmount: number, newAmount: number): number  {

    return (productValue / oldAmount) * newAmount

}