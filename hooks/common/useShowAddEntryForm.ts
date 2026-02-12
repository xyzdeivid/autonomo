import { DocsContext } from '@/context/DocsContext'
import { Item } from '@/types'
import { getServices } from '@/utils/schedulings'
import { useContext } from 'react'
import { Alert } from 'react-native'

function areThereAnyItemsAvailable(items: Item[]): boolean {
    if (getServices(items)[0]) return true
    return false
}

export function useShowAddEntryForm() {

    const [items] = useContext(DocsContext).items

    type ShowSomething = React.Dispatch<React.SetStateAction<boolean>>

    function showAddEntryForm(
        setShowAddEntryForm: ShowSomething,
        setShowFirstTimeCard: ShowSomething
    ) {

        const availableItems = areThereAnyItemsAvailable(items)

        if (availableItems) {

            setShowAddEntryForm(true)

        } else {

            if (items.length === 0) {

                setShowFirstTimeCard(true)

            } else {

                Alert.alert('App Autônomo', 'Nenhum produto com estoque disponível')

            }

        }

    }

    return { showAddEntryForm }

}