import { DocsContext } from '@/context/DocsContext'
import { updateNewStockedItemToDB } from '@/database/itemRepositories'
import { Item } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditStockItem = () => {

    const [items, setItems] = useContext(DocsContext).items

    const updateItemsInUI = (item: Item, newStock: number) => {

        const newItems = items.map(current => {

            if (current._id === item._id) {
                return { ...current, amount: newStock }
            }
            return current

        })

        setItems(newItems)

    }

    const editStockItem = async (newStock: number, item: Item) => {

        try {

            // Salvando item editado no banco de dados
            await updateNewStockedItemToDB(newStock, item._id)

            // Atualizando estado no UI
            updateItemsInUI(item, newStock)

        } catch {

            Alert.alert('Erro ao acessar banco de dados')

        }

    }

    return { editStockItem }

}

export default useEditStockItem