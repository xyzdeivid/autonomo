import { DocsContext } from '@/context/DocsContext'
import { Item } from '@/types'
import { updateItemToDb } from '@/database/itemRepositories'
import { useContext } from 'react'
import { Alert } from 'react-native'

const useEditItemName = () => {

    const [items, setItems] = useContext(DocsContext).items

    const updateItemsInUI = (item: Item, newName: string) => {

        const newItems = items.map(current => {

            if (current._id === item._id) {
                return { ...current, _id: newName }
            }
            return current

        })

        setItems(newItems)

    }

    const editItemName = async (newName: string, item: Item): Promise<boolean> => {

        // Verificando se existe algum outro serviço com o mesmo nome
        if (items.find(current => current._id === newName)) {
            Alert.alert('Já existe um serviço com esse nome.')
            return false
        }

        try {

            // Salvando item editado no banco de dados
            await updateItemToDb(newName, item._id)

            // Atualizando estado no UI
            updateItemsInUI(item, newName)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados',
                'Por favor, tente novamente mais tarde.'
            )
            return false

        }

    }

    return { editItemName }

}

export default useEditItemName