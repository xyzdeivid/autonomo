import { updateNewNamedOutflowToDb } from '@/database/outflowRepositories'
import { canEditOutflowName } from '@/rules/outflowRules'
import { UseCase } from '@/types'

export async function editOutflowNameUseCase(newName: string, outflowId: string): Promise<UseCase> {

    // *****REGRAS DE NEGÓCIO*****

    const editName = canEditOutflowName(newName)
    if (!editName.valid) return {
        success: false, error: editName.reason
    }
    
    // *****INSERÇÃO NO DB*****

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