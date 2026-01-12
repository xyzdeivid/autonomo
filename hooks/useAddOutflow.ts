import { DocsContext } from '@/context/DocsContext'
import { Item, Outflow } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'
import { addOutflowToDb } from '@/database/outflowRepositories'
import useEditStockItem from './useEditStockItem'

const useAddOutflow = () => {

    const [outflows, setOutflows] = useContext(DocsContext).outflows

    const editStockItem = useEditStockItem().editStockItem

    const addOutflow = async (outflow: Outflow, newStock?: number, item?: Item): Promise<boolean> => {

        try {

            let success: boolean = true

            // Atualizando estoque de produto caso seja uma reposição de estoque
            if (newStock && item) success = await editStockItem(newStock, item)

            // Impedindo inserção de nova despesa caso reposição falhe
            if (!success) return false

            // Inserindo nova despesa no banco de dados
            await addOutflowToDb(outflow)

            // Atualizando estado na UI
            const updatedOutflows = [...outflows, outflow]
            setOutflows(updatedOutflows)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { addOutflow }

}

export default useAddOutflow