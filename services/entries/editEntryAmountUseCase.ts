import { editEntryAmountToDb } from '@/database/entryRepositories'
import { editEntryAmountAndItemStockToDb } from '@/database/transactionRepositories'
import { canEditEntryAmount, newEntryValueOnEditAmount, newProductStockOnEditEntryAmount } from '@/rules/entryRules'
import { UseCase } from '@/types'

export async function editEntryAmountUseCase(newAmount: number, oldAmount: number,
    entryId: string, productValue: number, productAmount?: number,
    productId?: string): Promise<UseCase & { newEntryValue?: number, newStock?: number }> {

    // *****REGRAS DE NEGÓCIO*****

    const editEntryAmount = canEditEntryAmount(newAmount, oldAmount, productAmount)
    if (!editEntryAmount.valid) return {
        success: false, error: editEntryAmount.reason
    }

    const newEntryValue = newEntryValueOnEditAmount(productValue, oldAmount, newAmount)

    // *****INSERÇÃO NO DB*****

    try {

        if (productAmount !== undefined && productId !== undefined) {

            const newProductStock = newProductStockOnEditEntryAmount(newAmount, oldAmount, productAmount)
            await editEntryAmountAndItemStockToDb(newAmount, newEntryValue, entryId, newProductStock, productId)

            console.log('Com estoque')

            return {
                success: true,
                newEntryValue, 
                newStock: newProductStock
            }

        }

        await editEntryAmountToDb(newAmount, newEntryValue, entryId)

        console.log('Sem estoque')

        return {
            success: true,
            newEntryValue
        }

    } catch {

        return {
            success: false,
            error: 'DB_ERROR'
        }

    }

}