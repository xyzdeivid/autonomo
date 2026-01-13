import { DocsContext } from '@/context/DocsContext'
import { editCustomerNameToDb } from '@/database/entryRepositories'
import { Entry } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditCustomerName = () => {

    const [entries, setEntries] = useContext(DocsContext).entries

    const updateEntriesInUI = (id: string, customerName: string) => {

        const newEntries: Entry[] = entries.map(entry => {

            if (entry._id === id) {

                return {
                    ...entry, customer: customerName
                }

            }

            return entry

        })

        setEntries(newEntries)

    }

    const editCustomerName = async (id: string, customerName: string): Promise<boolean> => {

        try {

            // Editando nome de cliente ao banco de dados
            await editCustomerNameToDb(customerName, id)

            // Atualizando UI
            updateEntriesInUI(id, customerName)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { editCustomerName }

}

export default useEditCustomerName