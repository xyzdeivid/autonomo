import { deleteItemToDb } from '@/database/itemRepositories'
import { UseCase } from '@/types'

export async function deleteItemUseCase(itemId: string): Promise<UseCase> {

    // *****EXCLUSÃO NO DB*****

    try {

        await deleteItemToDb(itemId)

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