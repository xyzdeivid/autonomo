import { updateNewStockedItemToDB } from '@/database/itemRepositories'
import { canEditItemStock } from '@/rules/itemRules'
import { UseCase } from '@/types'

export async function editItemStockUseCase(newStock: number, itemId: string): Promise<UseCase> {

    // *****REGRAS DE NEGÓCIO*****

    const editStock = canEditItemStock(newStock)
    if (!editStock.valid) return {
        success: false, error: editStock.reason
    }

    // *****INSERÇÃO NO DB***** 

    try {

        await updateNewStockedItemToDB(newStock, itemId)

        return {
            success: true
        }

    } catch {

        return {
            success: false,
            error: 'DB_ERROR'
        }

    }

}