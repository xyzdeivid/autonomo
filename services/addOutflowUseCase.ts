import { addOutflowToDb } from '@/database/outflowRepositories'
import { addOutflowAndEditItemStockToDb } from '@/database/transactionRepositories'
import { isStockIntegrate, newProductStock } from '@/rules/outflowRules'
import { Item, Outflow } from '@/types'

export async function addOutflowUseCase(outflow: Outflow, item?: Item): Promise<{ success: boolean, newStock?: number, error?: string }> {

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