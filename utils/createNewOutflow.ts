import { Outflow } from '@/types'
import { generateId } from './common'

export const createNewOutflow = (
    valueChoice: string,
    purchaseValue: number,
    amount: number,
    name: string,
    purchaseDate: string
) => {

    const newExpenseValue =
        valueChoice === 'total' ? purchaseValue : purchaseValue * amount

    const newExpense: Outflow = {
        _id: generateId(),
        name,
        date: purchaseDate,
        value: newExpenseValue,
        ...(amount && { amount })
    }

    return newExpense

}