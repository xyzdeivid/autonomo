import { editEntryDateToDb } from '@/database/entryRepositories'
import { canEditEntryDate } from '@/rules/entryRules'
import { UseCase } from '@/types'

export async function editEntryDateUseCase(newEntryDate: string, entryId: string): Promise<UseCase> {

    /* *****REGRAS DE NEGÓCIO***** */

    // Verificando se edição será possível
    const editEntryDate = canEditEntryDate(newEntryDate)
    if (!editEntryDate.valid) return {
        success: false, error: editEntryDate.reason
    }

    /* *****INSERÇÃO NO DB***** */

    try {

        await editEntryDateToDb(newEntryDate, entryId)

        return {
            success: true
        }
        
    } catch  {

        return {
            success: false, error: 'DB_ERROR'
        }
        
    }

}