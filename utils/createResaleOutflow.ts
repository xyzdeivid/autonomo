import { Outflow } from '@/types/index'
import { generateId } from './common'

export default function createResaleOutflow(
    purchaseValue: number,
    amount: number,
    purchaseDate: string,
    name: string,
    valueOutflowChoice: string
): Outflow {

    const outflowValue =
        valueOutflowChoice === 'total' ? purchaseValue : purchaseValue * amount

    const outflow: Outflow = {
        _id: generateId(),
        name,
        date: purchaseDate,
        value: outflowValue,
        amount
    }

    return outflow

}