import { updateNewValuedItemToDB } from '@/database/itemRepositories'
import { canEditItemValue } from '@/rules/itemRules'
import { UseCase } from '@/types'

export async function editItemValueUseCase(newValue: number, itemId: string): Promise<UseCase> {

    // *****REGRAS DE NEGÓCIO*****

    const editItemValue = canEditItemValue(newValue)
    if (!editItemValue.valid) return {
        success: false, error: editItemValue.reason
    }
    
    // *****INSERÇÃO NO DB*****

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