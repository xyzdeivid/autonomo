import { updateNewNamedItemToDb } from '@/database/itemRepositories'
import { canEditItemName } from '@/rules/itemRules'
import { Item, UseCase } from '@/types'

export async function editItemNameUseCase(items: Item[], newName: string, oldName: string): Promise<UseCase> {

    /* *****REGRAS DE NEGÓCIO***** */

    // Verificando se posso editar nome
    const editItemName = canEditItemName(items, newName)
    if (!editItemName.valid) return {
        success: false, error: editItemName.reason
    }

    /* *****INSERÇÃO NO DB***** */

    try {

        await updateNewNamedItemToDb(newName, oldName)

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