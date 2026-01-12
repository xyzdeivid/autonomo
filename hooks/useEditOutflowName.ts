import { DocsContext } from '@/context/DocsContext'
import { updateNewNamedOutflowToDb } from '@/database/outflowRepositories'
import { Outflow } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditOutflowName = () => {

    const [outflows, setOutflows] = useContext(DocsContext).outflows

    const updateOutflowsInUI = (outflow: Outflow, newName: string) => {

        const newOutflows = outflows.map(current => {

            if (current._id === outflow._id) {

                return { ...current, name: newName }

            }

            return current

        })

        setOutflows(newOutflows)

    }

    const editOutflowName = async (outflow: Outflow, newName: string): Promise<boolean> => {

        try {

            await updateNewNamedOutflowToDb(newName, outflow._id)

            updateOutflowsInUI(outflow, newName)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { editOutflowName }

}

export default useEditOutflowName