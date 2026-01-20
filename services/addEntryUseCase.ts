import { addEntryToDb } from '@/database/entryRepositories'
import { addEntryAndReduceItemStockToDb } from '@/database/transactionRepositories'
import { canAddEntry, isStockEnough, newProductStock } from '@/rules/entryRules'
import { UseCase, Entry, Item } from '@/types'

export async function addEntryUseCase(entry: Entry, selectedProduct?: Item): Promise<UseCase & { newStock?: number }> {

    // *****REGRAS DE NEGÓCIO*****

    // Verificando se posso adicionar nova receita
    const addEntry = canAddEntry(entry)
    if (!addEntry.valid) return {
        success: false, error: addEntry.reason
    }

    // Verificando se operação de estoque é valida 
    // caso tenha sido produto comprado
    if (
        selectedProduct?.amount !== undefined
        && entry.serviceAmount !== undefined
    ) {
        const stockEnough = isStockEnough(selectedProduct.amount, entry.serviceAmount)
        if (!stockEnough) return {
            success: false, error: 'INSUFFICIENT_STOCK'
        }
    }

    // *****INSERÇÃO NO DB*****

    try {

        // Atualizando estoque de produto 
        // caso a receita tenha sido a venda de algum
        if (
            selectedProduct?.amount !== undefined
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