import { DocsContext } from '@/context/DocsContext'
import { Entry } from '@/types'
import { useContext } from 'react'
import useEditStockItem from './useEditItemStock'
import { deleteEntryToDb } from '@/database/entryRepositories'
import { Alert } from 'react-native'

const useDeleteEntry = () => {

    const [entries, setEntries] = useContext(DocsContext).entries
    const [items] = useContext(DocsContext).items

    const editStockItem = useEditStockItem().editStockItem

    const updateEntriesInUI = (id: string) => {

        const remainingEntries = entries.filter(entry => {

            return entry._id !== id

        })

        setEntries(remainingEntries)

    }

    const updateItemStock = async (entry: Entry): Promise<boolean> => {

        const product = items.find(current => {
            return current._id === entry.serviceId
        })

        if (product && entry.serviceIsThereAmount && entry.serviceAmount) {

            const newProductAmount = product.amount
                ? product.amount + entry.serviceAmount
                : 0 + entry.serviceAmount

            const success = await editStockItem(newProductAmount, product)

            if (!success) return false

            return true

        }

        return true

    }

    const deleteEntry = async (entry: Entry): Promise<boolean> => {

        try {

            let success: boolean = true

            // Atualizando estoque de produto caso tenha algum vinculado
            if (entry.serviceIsThereAmount) success = await updateItemStock(entry)

            // Parando operação caso atualização de estoque falhe
            if (!success) return false

            // Excluindo receita
            await deleteEntryToDb(entry._id)

            // Atualizando estado na UI
            updateEntriesInUI(entry._id)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { deleteEntry }

}

export default useDeleteEntry