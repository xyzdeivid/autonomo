import { editEntryAmountAndItemStockToDb } from '@/database/transactionRepositories'
import { canEditEntryAmount, newProductStockOnEditEntryAmount } from '@/rules/entryRules'
import { UseCase } from '@/types'

export async function editEntryAmountUseCase(newAmount: number, oldAmount: number,
    productAmount: number, entryId: string,
    productId: string): Promise<UseCase & { newStock?: number }> {

    // *****REGRAS DE NEGÓCIO*****

    const editEntryAmount = canEditEntryAmount(newAmount, oldAmount, productAmount)
    if (!editEntryAmount.valid) return {
        success: false, error: editEntryAmount.reason
    }

    const newProductStock = newProductStockOnEditEntryAmount(newAmount, oldAmount, productAmount)

    // *****INSERÇÃO NO DB*****

    try {

        await editEntryAmountAndItemStockToDb(newAmount, entryId, newProductStock, productId)

        return {
            success: true, newStock: newProductStock
        }

    } catch {

        return {
            success: false,
            error: 'DB_ERROR'
        }

    }

}