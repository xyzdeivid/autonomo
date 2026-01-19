import { DocsContext } from '@/context/DocsContext'
import { Outflow } from '@/types'
import { useContext } from 'react'
import { deleteOutflowUseCase } from '@/services/deleteOutflowUseCase'

const useDeleteOutflow = () => {

    const [items, setItems] = useContext(DocsContext).items
    const [, setOutflows] = useContext(DocsContext).outflows

    const deleteOutflow = async (outflow: Outflow): Promise<{ success: boolean, error?: string }> => {

        // Procurando item caso seja reposição de estoque
        const itemToReduceStock = items.find(current => current._id === outflow.name)

        const result = await deleteOutflowUseCase(outflow, itemToReduceStock)

        if (result.success) {

            // Atualizando despesas na UI
            setOutflows(prev =>
                prev.filter(current => {
                    return current._id !== outflow._id
                })
            )

            // Atualizando estoque de item na UI caso seja necessário
            if (itemToReduceStock) {
                const newStock = result.newStock
                setItems(prev =>
                    prev.map(current => {
                        if (current._id === itemToReduceStock._id) {
                            return { ...current, amount: newStock }
                        }
                        return current
                    })
                )
            }

        }

        return result

    }

    return { deleteOutflow }

}

export default useDeleteOutflow