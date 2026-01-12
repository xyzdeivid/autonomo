import { DocsContext } from '@/context/DocsContext'
import { Outflow } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'
import { orderExpenses } from '@/functions/expenses'
import { addOutflowToDb } from '@/database/outflowRepositories'

const useAddOutflow = () => {

    const [outflows, setOutflows] = useContext(DocsContext).outflows

    const addOutflow = async (outflow: Outflow): Promise<boolean> => {

        try {

            await addOutflowToDb(outflow)
            const updatedServices = orderExpenses([...outflows, outflow])
            setOutflows(updatedServices)

            return true

        } catch {

            Alert.alert('Erro ao acessar banco de dados', 'Por favor, tente novamente mais tarde.')
            
            return false

        }

    }

    return { addOutflow }

}

export default useAddOutflow