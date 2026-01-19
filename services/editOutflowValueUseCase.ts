import { updateNewValuedOutflowToDb } from '@/database/outflowRepositories'
import { UseCase } from '@/types'

export async function editOutflowValueUseCase(newValue: number, outflowId: string): Promise<UseCase> {

    /* *****INSERÇÃO NO DB***** */

    try {

        await updateNewValuedOutflowToDb(newValue, outflowId)

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