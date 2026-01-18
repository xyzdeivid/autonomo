import { addItemToDb } from '@/database/itemRepositories'
import { addOutflowAndItemToDb } from '@/database/transactionRepositories'
import { canAddItem, needResaleOutflow } from '@/rules/itemRules'
import { UseCase, Item, Outflow } from '@/types'

export async function addItemUseCase(items: Item[], item: Item, resaleOutflow?: Outflow): Promise<UseCase> {

    /* *****REGRAS DE NEGÓCIO***** */
    
    // Verificando se posso adicionar novo item
    const addItem = canAddItem(items, item._id, resaleOutflow)
    if (!addItem.valid) return { success: false, error: addItem.reason }

    
    /* *****INSERÇÃO NO DB***** */
    
    try {

        if (needResaleOutflow(item) && resaleOutflow) {

            // Salvando novo produto e nova despesa caso seja revenda
            await addOutflowAndItemToDb(resaleOutflow, item)

        } else {

            await addItemToDb(item)

        }

        return { success: true }

    } catch {

        return { success: false, error: 'DB_ERROR' }

    }

}