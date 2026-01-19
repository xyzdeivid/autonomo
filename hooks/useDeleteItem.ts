import { DocsContext } from '@/context/DocsContext'
import { deleteItemUseCase } from '@/services/deleteItemUseCase'
import { useContext } from 'react'

const useDeleteItem = () => {

    const [, setItems] = useContext(DocsContext).items

    const deleteItem = async (itemId: string): Promise<{ success: boolean, error?: string }> => {

        const result = await deleteItemUseCase(itemId)

        if (result.success) {
            // Atualizando itens na UI
            setItems(prev =>
                prev.filter(item => {
                    return item._id !== itemId
                })
            )
        }

        return result

    }

    return { deleteItem }

}

export default useDeleteItem