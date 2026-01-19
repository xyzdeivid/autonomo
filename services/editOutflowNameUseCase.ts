import { updateNewNamedOutflowToDb } from '@/database/outflowRepositories'
import { UseCase } from '@/types'

export async function editOutflowNameUseCase(newName: string, outflowId: string): Promise<UseCase> {

    /* *****INSERÇÃO NO DB***** */

    try {

        await updateNewNamedOutflowToDb(newName, outflowId)

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