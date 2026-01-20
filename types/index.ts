export interface Item {
    category: string
    _id: string
    value: number
    isThereAmount: boolean
    resale: boolean
    amount?: number
}

export interface Outflow {
    _id: string
    name: string
    date: string
    value: number
    amount?: number
}

export interface Entry {
    _id: string
    date: string
    serviceId: string
    serviceCategory: string
    serviceValue: number
    serviceIsThereAmount: boolean
    serviceAmount?: number
    customer?: string
}

export interface OldEntry {
    _id: string
    service: Item
    date: string
    customer?: string
}

export type CanDo = { valid: boolean, reason?: string }

export type UseCase = { success: boolean, error?: string }