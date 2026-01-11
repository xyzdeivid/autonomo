import { Item, DocsContext } from "@/context/DocsContext"
import { addItemToDb } from "@/database/repositories"
import { orderServices } from "@/functions/services"
import { useContext } from "react"
import { Alert } from "react-native"

const useAddItem = () => {

    const [items, setItems] = useContext(DocsContext).items

    const checkIfThereIsAnotherItem = (items: Item[], name: string): boolean => {

        const isThereAnotherItem = items.filter(item => {
            const serviceName = item._id.toLocaleLowerCase()
            const nameToCompare = name.toLocaleLowerCase()
            return serviceName === nameToCompare
        })[0]

        return isThereAnotherItem
            ? true
            : false

    }

    const addItem = async (item: Item) => {

        if (checkIfThereIsAnotherItem(items, item._id)) {

            Alert.alert(
                'Item existente', 
                'Já existe um item com este nome. Por favor, escolha outro nome para continuar.'
            )
            return false

        }

        try {

            await addItemToDb(item)
            const updatedServices = orderServices([...items, item])
            setItems(updatedServices)
            return true

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados', 'Por favor, tente novamente mais tarde.')
            return false

        }

    }

    return { addItem }

}

export default useAddItem