import { DocsContext } from '@/context/DocsContext'
import { Entry } from '@/types'
import { useContext } from 'react'
import { deleteEntryUseCase } from '@/services/deleteEntryUseCase'

const useDeleteEntry = () => {

    const appDocs = useContext(DocsContext)
    const [, setEntries] = appDocs.entries
    const [items, setItems] = appDocs.items

    const deleteEntry = async (entry: Entry): Promise<{ success: boolean, error?: string }> => {

        // Buscando produto caso receita tenha sido a venda de um
        const product = items.find(current => current._id === entry.serviceId)

        const result = await deleteEntryUseCase(entry, product)

        if (result.success) {

            // Atualizando receitas na UI
            setEntries(prev =>
                prev.filter(current => {
                    return current._id !== entry._id
                })
            )

            // Atualizando produtos na UI caso necessário
            if (product && result.newStock) {
                setItems(prev =>
                    prev.map(current => {
                        if (current._id === product._id) return {
                            ...current, amount: result.newStock
                        }
                        return current
                    })
                )
            }

        }

        return result

    }

    return { deleteEntry }

}

export default useDeleteEntry