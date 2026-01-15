import { DocsContext } from '@/context/DocsContext'
import { updateNewDatedOutflowToDb } from '@/database/outflowRepositories'
import { Outflow } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditOutflowDate = () => {

    const [outflows, setOutflows] = useContext(DocsContext).outflows

    const updateOutflowsInUI = (outflow: Outflow, newDate: string) => {

        const newOutflows = outflows.map(current => {

            if (current._id === outflow._id) {

                return { ...current, date: newDate }

            }

            return current

        })

        setOutflows(newOutflows)

    }

    const editOutflowDate = async (outflow: Outflow, newDate: string): Promise<boolean> => {

        try {

            await updateNewDatedOutflowToDb(newDate, outflow._id)

            updateOutflowsInUI(outflow, newDate)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { editOutflowDate }

}

export default useEditOutflowDate