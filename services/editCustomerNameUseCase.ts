import { editCustomerNameToDb } from '@/database/entryRepositories'
import { AddUseCase } from '@/types'

export async function editCustomerNameUseCase(customerName: string, entryId: string): Promise<AddUseCase> {

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