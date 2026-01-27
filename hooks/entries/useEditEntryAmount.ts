import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { Entry } from '@/types'
import { editEntryAmountUseCase } from '@/services/entries/editEntryAmountUseCase'

const useEditEntryAmount = () => {

    const appDocs = useContext(DocsContext)
    const [, setEntries] = appDocs.entries
    const [items, setItems] = appDocs.items

    const editEntryAmount = async (newAmount: number, entry: Entry): Promise<{ success: boolean, error?: string }> => {

        const product = items.find(current => current._id === entry.serviceId)

        if (entry.serviceAmount !== undefined) {

            console.log(entry.serviceValue)

            const result = await editEntryAmountUseCase(
                newAmount,
                entry.serviceAmount,
                entry._id,
                entry.serviceValue,
                product?.amount,
                product?._id
            )

            if (result.success) {

                if (result.newEntryValue) {

                    const newValue = result.newEntryValue

                    // Atualizando receitas na UI
                    setEntries(prev =>
                        prev.map(current => {
                            if (current._id === entry._id) {
                                return {
                                    ...current,
                                    serviceValue: newValue,
                                    serviceAmount: newAmount
                                }
                            }
                            return current
                        })
                    )
                }

                if (product !== undefined && product.amount !== undefined) {
                    // Atualizando estoque de produto na UI
                    setItems(prev =>
                        prev.map(current => {
                            if (current._id === product._id) {
                                return {
                                    ...current,
                                    serviceValue: result.newEntryValue,
                                    amount: result.newStock
                                }
                            }
                            return current
                        })
                    )
                }

            }

            return result

        }

        return {
            success: false
        }

    }

    return { editEntryAmount }

}

export default useEditEntryAmount