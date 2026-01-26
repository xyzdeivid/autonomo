import { editCustomerNameToDb } from '@/database/entryRepositories'
import { canEditCustomerName } from '@/rules/entryRules'
import { UseCase } from '@/types'

export async function editCustomerNameUseCase(customerName: string, entryId: string): Promise<UseCase> {

    // *****REGRAS DE NEGÓCIO*****

    const editName = canEditCustomerName(customerName)
    if (!editName.valid) return {
        success: false, error: editName.reason
    }
    
    // *****INSERÇÃO NO DB*****

    try {

        await editCustomerNameToDb(customerName, entryId)

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