import { DocsContext } from '@/context/DocsContext'
import { editEntryDateToDb } from '@/database/entryRepositories'
import { Entry } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditEntryDate = () => {

    const [entries, setEntries] = useContext(DocsContext).entries

    const getCurrentDate = () => {
        const year = new Date().getFullYear()
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const day = String(new Date().getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const updateEntriesInUI = (id: string, newDate: string) => {

        const newEntries: Entry[] = entries.map(entry => {

            if (entry._id === id) {

                return {
                    ...entry, date: newDate
                }

            }

            return entry

        })

        setEntries(newEntries)

    }

    const editEntryDate = async (newDate: string, id: string): Promise<boolean> => {

        try {

            const currentDate = new Date(getCurrentDate())
            const entryDate = new Date(newDate)

            if (entryDate <= currentDate) {

                // Inserindo receita com nova data no db
                await editEntryDateToDb(newDate, id)

                // Atualização UIs
                updateEntriesInUI(id, newDate)

                return true

            } else {

                // Impossibilitando de registrar receitas em datas futuras
                Alert.alert('Não é possivel registrar entradas em datas futuras')

                return false

            }


        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { editEntryDate }

}

export default useEditEntryDate