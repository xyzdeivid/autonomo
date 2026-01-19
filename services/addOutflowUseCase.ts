import { addOutflowToDb } from '@/database/outflowRepositories'
import { addOutflowAndEditItemStockToDb } from '@/database/transactionRepositories'
import { canAddOutflow, isStockIntegrate, newProductStock } from '@/rules/outflowRules'
import { UseCase, Item, Outflow } from '@/types'

export async function addOutflowUseCase(outflow: Outflow, item?: Item): Promise<UseCase & { newStock?: number }> {

    /* *****REGRAS DE NEGÓCIO***** */

    // Verificando se posso adicionar nova despesa
    const addOutflow = canAddOutflow(outflow)
    if (!addOutflow.valid) return {
        success: false, error: addOutflow.reason
    }

    /* *****INSERÇÃO NO DB***** */

    try {

        // Atualizando estoque de produto caso seja uma reposição de estoque
        if (isStockIntegrate(outflow) && item?.amount && outflow.amount) {

            // Novo estoque do produto
            const newStock = newProductStock(item.amount, outflow.amount)

            // Salvar os dois no db
            await addOutflowAndEditItemStockToDb(outflow, newStock, item._id)

            return {
                success: true,
                newStock
            }

        }

        // Salvar apenas despesa
        await addOutflowToDb(outflow)

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