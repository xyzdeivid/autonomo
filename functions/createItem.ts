import { Item } from '@/types/index'

const checkIfItemHasAmount = (category: string, resale: boolean, stock: boolean) => {

    if (category === 'product') {

        if (resale || stock) return true

    }

    return false

}

export default function createItem(
    category: string, 
    _id: string, 
    value: number, 
    amount: number, 
    resale: boolean, 
    stock: boolean
): Item {

    const item: Item = {
        category,
        _id,
        value,
        isThereAmount: checkIfItemHasAmount(category, resale, stock),
        resale
    }
    if (item.isThereAmount) item.amount = amount

    return item
    
}