import { DocsContext } from '@/context/DocsContext'
import { updateNewValuedItemToDB } from '@/database/itemRepositories'
import { Item } from '@/types'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditItemValue = () => {

    const [items, setItems] = useContext(DocsContext).items

    const updateItemsInUI = (item: Item, newValue: number) => {

        const newItems = items.map(current => {

            if (current._id === item._id) {
                return { ...current, value: newValue }
            }
            return current

        })

        setItems(newItems)

    }

    const editItemValue = async (newValue: number, item: Item) => {

        try {

            // Salvando item editado no banco de dados
            await updateNewValuedItemToDB(newValue, item._id)

            // Atualizando estado no UI
            updateItemsInUI(item, newValue)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { editItemValue }

}

export default useEditItemValue