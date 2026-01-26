import { DocsContext } from '@/context/DocsContext'
import { Item, Outflow } from '@/types/index'
import { useContext } from 'react'
import { addItemUseCase } from '@/services/items/addItemUseCase'

const useAddItem = () => {

    const appDocs = useContext(DocsContext)
    const [items, setItems] = appDocs.items
    const [outflows, setOutflows] = appDocs.outflows

    const addItem = async (item: Item, resaleOutflow?: Outflow): Promise<{ success: boolean, error?: string }> => {

        const result = await addItemUseCase(items, item, resaleOutflow)

        if (result.success) {

            // Atualizando itens na UI
            setItems(prev => [...prev, item])

            // Atualizando despesas na UI se necessário
            if (resaleOutflow) {
                const updatedOutflows = [...outflows, resaleOutflow]
                setOutflows(updatedOutflows)
            }

        }

        return result

    }

    return { addItem }

}

export default useAddItem