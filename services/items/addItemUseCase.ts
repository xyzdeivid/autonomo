import { addItemToDb } from '@/database/itemRepositories'
import { addItemAndOutflowToDb } from '@/database/transactionRepositories'
import { canAddItem, needResaleOutflow } from '@/rules/itemRules'
import { canAddOutflow } from '@/rules/outflowRules'
import { UseCase, Item, Outflow } from '@/types'

export async function addItemUseCase(items: Item[], item: Item, resaleOutflow?: Outflow): Promise<UseCase> {

    /* *****REGRAS DE NEGÓCIO***** */
    
    // Verificando se posso adicionar novo item
    const addItem = canAddItem(items, item)
    if (!addItem.valid) return { success: false, error: addItem.reason }

    // Verificando se posso adicionar nova despesa caso seja revenda
    if (needResaleOutflow(item) && resaleOutflow) {
        const addOutflow = canAddOutflow(resaleOutflow)
        if (!addOutflow.valid) return {
            success: false, error: addOutflow.reason
        }
    }

    
    /* *****INSERÇÃO NO DB***** */
    
    try {

        if (needResaleOutflow(item) && resaleOutflow) {

            // Salvando novo produto e nova despesa caso seja revenda
            await addItemAndOutflowToDb(resaleOutflow, item)

        } else {

            await addItemToDb(item)

        }

        return { success: true }

    } catch {

        return { success: false, error: 'DB_ERROR' }

    }

}