import { updateNewValuedItemToDB } from '@/database/itemRepositories'
import { UseCase } from '@/types'

export async function editItemValueUseCase(newValue: number, itemId: string): Promise<UseCase> {

    /* *****INSERÇÃO NO DB***** */

    try {

        await updateNewValuedItemToDB(newValue, itemId)

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