import { DocsContext } from '@/context/DocsContext'
import { Outflow } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'
import useEditStockItem from './useEditStockItem'
import { deleteOutflowToDb } from '@/database/outflowRepositories'

const useDeleteOutflow = () => {

    const [items] = useContext(DocsContext).items
    const [outflows, setOutflows] = useContext(DocsContext).outflows

    const editStockItem = useEditStockItem().editStockItem

    const updateOutflowsInUI = (id: string) => {

        const remainingOutflows = outflows.filter(current => {

            return current._id !== id

        })

        setOutflows(remainingOutflows)

    }

    const updateItemStock = async (outflow: Outflow): Promise<boolean> => {

        const product = items.find(current =>
            current._id === outflow.name
        )

        if (product?.amount && outflow.amount) {

            let newAmount: number = 0

            if (product.amount > outflow.amount) {

                newAmount = product.amount - outflow.amount

            }

            const success = await editStockItem(newAmount, product)

            if (!success) return false

            return true

        }

        return true

    }

    const deleteOutflow = async (outflow: Outflow): Promise<boolean> => {

        try {

            let success: boolean = true

            // Atualizando estoque de produto caso tenha algum vinculado
            if (outflow.amount) success = await updateItemStock(outflow)

            // Parando operação caso atualização de estoque falhe
            if (!success) return false

            // Excluindo despesa
            await deleteOutflowToDb(outflow._id)

            // Atualizando estado na UI
            updateOutflowsInUI(outflow._id)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { deleteOutflow }

}

export default useDeleteOutflow