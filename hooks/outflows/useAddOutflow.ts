import { DocsContext } from '@/context/DocsContext'
import { Item, Outflow } from '@/types'
import { useContext } from 'react'
import { addOutflowUseCase } from '@/services/outflows/addOutflowUseCase'

const useAddOutflow = () => {

    const useDocs = useContext(DocsContext)
    const [, setOutflows] = useDocs.outflows
    const [, setItems] = useDocs.items


    const addOutflow = async (outflow: Outflow, item?: Item): Promise<{ success: boolean, error?: string }> => {

        // Mandando dados para avaliação e inserção ao DB
        const result = await addOutflowUseCase(outflow, item)

        if (result.success) {

            // Atualizando despesas na UI
            setOutflows(prev => [...prev, outflow])

            // Atualizando produto na UI se necessário
            if (item) {

                setItems(prev =>

                    prev.map(current => {

                        if (current._id === item._id) {

                            return { ...current, amount: result.newStock }

                        }

                        return current

                    })

                )

            }

        }

        return result

    }

    return { addOutflow }

}

export default useAddOutflow