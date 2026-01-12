import { DocsContext } from '@/context/DocsContext'
import { updateNewValuedOutflowToDb } from '@/database/outflowRepositories'
import { Outflow } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditOutflowValue = () => {

    const [outflows, setOutflows] = useContext(DocsContext).outflows

    const updateOutflowsInUI = (outflow: Outflow, newValue: number) => {

        const newOutflows = outflows.map(current => {

            if (current._id === outflow._id) {

                return { ...current, value: newValue }

            }

            return current

        })

        setOutflows(newOutflows)

    }

    const editOutflowValue = async (outflow: Outflow, newValue: number): Promise<boolean> => {

        try {

            await updateNewValuedOutflowToDb(newValue, outflow._id)

            updateOutflowsInUI(outflow, newValue)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { editOutflowValue }

}

export default useEditOutflowValue