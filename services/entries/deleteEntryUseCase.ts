import { deleteEntryToDb } from '@/database/entryRepositories'
import { deleteEntryAndIncrementItemStockToDb } from '@/database/transactionRepositories'
import { newProductStockOnDeleteEntry } from '@/rules/entryRules'
import { Entry, Item, UseCase } from '@/types'

export async function deleteEntryUseCase(entry: Entry, product?: Item): Promise<UseCase & { newStock?: number }> {

    // *****EXCLUSÃO NO DB*****

    try {

        // Devolvendo estoque a produto 
        // caso receita tenha sido produto
        if (
            product 
            && product.amount !== undefined
            && entry.serviceAmount !== undefined
        ) {
            const newStock = newProductStockOnDeleteEntry(product.amount, entry.serviceAmount)
            await deleteEntryAndIncrementItemStockToDb(entry._id, newStock, product._id)
            return {
                success: true,
                newStock
            }
        }

        await deleteEntryToDb(entry._id)
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