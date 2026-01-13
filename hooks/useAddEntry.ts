import { Entry, Item } from '@/types/index'
import useEditStockItem from './useEditStockItem'
import { addEntryToDb } from '@/database/entryRepositories'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { Alert } from 'react-native'

const useAddEntry = () => {

    const [entries, setEntries] = useContext(DocsContext).entries

    const editStockItem = useEditStockItem().editStockItem

    const addEntry = async (entry: Entry, item?: Item): Promise<boolean> => {

        try {

            let success: boolean = true

            // Abatendo do estoque se a venda for um produto
            if (entry.serviceAmount && item?.amount) {

                success = await editStockItem(item.amount - entry.serviceAmount, item)

            }

            // Retornando erro caso a operação de abatimento falhe
            if (!success) return false

            // Inserindo nova receita no banco de dados
            await addEntryToDb(entry)

            // Atualizando estado na UI
            const updatedSchedulings = [...entries, entry]
            setEntries(updatedSchedulings)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { addEntry }

}

export default useAddEntry