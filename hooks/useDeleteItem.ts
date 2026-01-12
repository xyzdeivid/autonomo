import { DocsContext } from '@/context/DocsContext'
import { deleteItemToDb } from '@/database/itemRepositories'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useDeleteItem = () => {

    const [items, setItems] = useContext(DocsContext).items

    const updateItemsInUI = (id: string) => {

        const remainingItems = items.filter(item => {

            return item._id !== id

        })

        setItems(remainingItems)

    }

    const deleteItem = async (itemId: string): Promise<boolean> => {

        try {

            // Deletando item do banco de dados
            await deleteItemToDb(itemId)

            // Atualizando estado na UI
            updateItemsInUI(itemId)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { deleteItem }

}

export default useDeleteItem