import { Item, Outflow } from '@/types'
import { generateId } from './common'

export default function createOutflow(
    stockIntegrate: boolean,
    name: string,
    product: Item,
    date: string,
    value: number,
    resaleValue: number,
    amount: number
) {

    const newOutflow: Outflow = {
        _id: generateId(),
        name: !stockIntegrate ? name : product._id,
        date,
        value: !stockIntegrate ? value : resaleValue,
        ...(stockIntegrate && { amount })
    }

    return newOutflow

}