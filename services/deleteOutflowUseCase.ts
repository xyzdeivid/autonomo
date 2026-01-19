import { deleteOutflowToDb } from '@/database/outflowRepositories'
import { deleteOutflowAndReduceItemStockToDb } from '@/database/transactionRepositories'
import { newProductStockOnDecrement } from '@/rules/outflowRules'
import { Item, Outflow, UseCase } from '@/types'

export async function deleteOutflowUseCase(outflow: Outflow, item?: Item): Promise<UseCase & { newStock?: number }> {

    /* *****EXCLUSÃO NO DB***** */

    try {

        // Excluindo despesa e abatendo estoque caso tenha sido uma reposição
        if (item && item.amount !== undefined && outflow.amount !== undefined) {
            const newStock = newProductStockOnDecrement(item.amount, outflow.amount)
            await deleteOutflowAndReduceItemStockToDb(outflow._id, newStock, item._id)
            return { success: true, newStock }
        }

        await (deleteOutflowToDb(outflow._id))

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