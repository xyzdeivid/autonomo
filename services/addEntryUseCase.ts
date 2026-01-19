import { addEntryToDb } from '@/database/entryRepositories'
import { addEntryAndReduceItemStockToDb } from '@/database/transactionRepositories'
import { canAddEntry, needReduceStock, newProductStock } from '@/rules/entryRules'
import { UseCase, Entry, Item } from '@/types'

export async function addEntryUseCase(entry: Entry, selectedProduct?: Item): Promise<UseCase & { newStock?: number }> {

    /* *****REGRAS DE NEGÓCIO***** */

    // Verificando se posso adicionar nova receita
    const addEntry = canAddEntry(entry, selectedProduct)
    if (!addEntry.valid) return {
        success: false, error: addEntry.reason
    }

    /* *****INSERÇÃO NO DB***** */

    try {

        // Atualizando estoque de produto caso a receita tenha sido a venda de algum
        if (
            needReduceStock(entry)
            && selectedProduct?.amount !== undefined
            && entry.serviceAmount !== undefined
        ) {

            const newStock = newProductStock(selectedProduct.amount, entry.serviceAmount)

            await addEntryAndReduceItemStockToDb(entry, newStock, selectedProduct._id)

            return {
                success: true,
                newStock
            }

        }

        await addEntryToDb(entry)

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