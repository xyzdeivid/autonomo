import { addItemToDb } from '@/database/itemRepositories'
import { addOutflowAndItemToDb } from '@/database/transactionRepositories'
import { canAddItem, needResaleOutflow } from '@/rules/itemRules'
import { Item, Outflow } from '@/types'

export async function addItemUseCase(items: Item[], item: Item, resaleOutflow?: Outflow): Promise<{ success: boolean, error?: string }> {

    // Verificando se posso adicionar novo item
    const addItem = canAddItem(items, item, resaleOutflow)
    if (!addItem.valid) return { success: false, error: addItem.reason }

    try {

        if (needResaleOutflow(item)) {

            // Salvando novo produto e nova despesa caso seja revenda
            if (resaleOutflow) await addOutflowAndItemToDb(resaleOutflow, item)

        } else {

            await addItemToDb(item)

        }

        return { success: true }

    } catch {

        return { success: false, error: 'DB_ERROR' }

    }

}