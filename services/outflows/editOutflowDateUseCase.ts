import { updateNewDatedOutflowToDb } from '@/database/outflowRepositories'
import { canEditOutflowDate } from '@/rules/outflowRules'
import { UseCase } from '@/types'

export async function editOutflowDateUseCase(newDate: string, outflowId: string): Promise<UseCase> {

    /* *****REGRAS DE NEGÓCIO***** */

    // Verificando se edição será possível
    const editOutflowDate = canEditOutflowDate(newDate)
    if (!editOutflowDate.valid) return {
        success: false, error: editOutflowDate.reason
    }
    
    /* *****INSERÇÃO NO DB***** */

    try {

        await updateNewDatedOutflowToDb(newDate, outflowId)

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