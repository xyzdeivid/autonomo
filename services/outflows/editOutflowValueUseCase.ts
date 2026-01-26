import { updateNewValuedOutflowToDb } from '@/database/outflowRepositories'
import { canEditOutflowValue } from '@/rules/outflowRules'
import { UseCase } from '@/types'

export async function editOutflowValueUseCase(newValue: number, outflowId: string): Promise<UseCase> {

    // *****REGRAS DE NEGÓCIO*****

    const editOutflowValue = canEditOutflowValue(newValue)
    if (!editOutflowValue.valid) return {
        success: false, error: editOutflowValue.reason
    }
    
    // *****INSERÇÃO NO DB*****

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