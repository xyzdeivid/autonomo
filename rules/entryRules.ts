import { isTodayOrPast } from '@/utils/common'
import { CanDo, Entry } from '@/types'
import { canEditName, isStringValid } from './domainRules'

function areAllTheFieldsCorrect(entry: Entry): boolean {

    if (typeof entry._id !== 'string' || !isStringValid(entry._id)) return false
    if (typeof entry.date !== 'string' || !isStringValid(entry.date)) return false
    if (typeof entry.serviceId !== 'string' || !isStringValid(entry.serviceId)) return false
    if (typeof entry.serviceCategory !== 'string' || !isStringValid(entry.serviceCategory)) return false
    if (typeof entry.serviceValue !== 'number') return false
    if (typeof entry.serviceIsThereAmount !== 'boolean') return false

    // Verificando caso campo tenha sido enviado
    if (entry.serviceIsThereAmount) {
        if (typeof entry.serviceAmount !== 'number') return false
    }
    if (entry.customer !== undefined) {
        if (typeof entry.customer !== 'string' || !isStringValid(entry.customer)) return false
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

export function newProductStock(currentStock: number, reduceAmount: number): number {

    return currentStock - reduceAmount

}

export function canEditCustomerName(customerName: string): CanDo {

    // Verificando se nome é valido
    const editName = canEditName(customerName)
    if (!editName) return {
        valid: false, reason: 'INVALID_FIELD'
    }

    return {
        valid: true
    }

}
export function canEditEntryDate(newDate: string): CanDo {

    // Verificando se data editada é futura
    const todayOrPast = isTodayOrPast(newDate)
    if (!todayOrPast) return {
        valid: false, reason: 'FUTURE_DATE'
    }

    return {
        valid: true
    }

}