import { DocsContext } from '@/context/DocsContext'
import { Item, Outflow } from '@/types/index'
import { addItemToDb } from '@/database/itemRepositories'
import { orderServices } from '@/functions/services'
import { useContext } from 'react'
import { Alert } from 'react-native'
import useAddOutflow from './useAddOutflow'

const useAddItem = () => {

    const [items, setItems] = useContext(DocsContext).items
    const addOutflow = useAddOutflow().addOutflow

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

    const addItem = async (item: Item, resaleOutflow?: Outflow): Promise<boolean> => {

        if (checkIfThereIsAnotherItem(items, item._id)) {

            Alert.alert(
                'Item existente', 
                'Já existe um item com este nome. Por favor, escolha outro nome para continuar.'
            )
            return false

        }

        try {

            let success: boolean = true

            // add resale outflow if needed
            if (item.resale && resaleOutflow) success = await addOutflow(resaleOutflow)

            // if adding resale outflow failed, do not proceed
            if (!success) return false

            await addItemToDb(item)

            const updatedServices = orderServices([...items, item])
            setItems(updatedServices)

            return true

        } catch {

            Alert.alert(
                'Erro ao acessar banco de dados', 
                'Por favor, tente novamente mais tarde.'
            )

            return false

        }

    }

    return { addItem }

}

export default useAddItem