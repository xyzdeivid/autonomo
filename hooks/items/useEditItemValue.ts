import { DocsContext } from '@/context/DocsContext'
import { editItemValueUseCase } from '@/services/items/editItemValueUseCase'
import { useContext } from 'react'

const useEditItemValue = () => {

    const [, setItems] = useContext(DocsContext).items

    const editItemValue = async (newValue: number, itemId: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editItemValueUseCase(newValue, itemId)

        if (result.success) {

            setItems(prev =>

                prev.map(current => {

                    if (current._id === itemId) {
                        return { ...current, value: newValue }
                    }
                    return current

                })

            )

        }

        return result

    }

    return { editItemValue }

}

export default useEditItemValue