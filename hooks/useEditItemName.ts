import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { editItemNameUseCase } from '@/services/editItemNameUseCase'

const useEditItemName = () => {

    const [items, setItems] = useContext(DocsContext).items

    const editItemName = async (newName: string, oldName: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editItemNameUseCase(items, newName, oldName)

        if (result.success) {

            // Atualizando item editado na UI
            setItems(prev =>

                prev.map(current => {

                    if (current._id === oldName) {

                        return { ...current, _id: newName }

                    }

                    return current

                })

            )

        }

        return result

    }

    return { editItemName }

}

export default useEditItemName