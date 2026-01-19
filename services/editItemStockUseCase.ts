import { updateNewStockedItemToDB } from '@/database/itemRepositories'
import { UseCase } from '@/types'

export async function editItemStockUseCase(newStock: number, itemId: string): Promise<UseCase> {

    /* *****INSERÇÃO NO DB***** */

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