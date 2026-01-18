import { editCustomerNameToDb } from '@/database/entryRepositories'
import { UseCase } from '@/types'

export async function editCustomerNameUseCase(customerName: string, entryId: string): Promise<UseCase> {

    /* *****INSERÇÃO NO DB***** */

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