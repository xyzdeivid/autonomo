import { DocsContext } from '@/context/DocsContext'
import { editItemStockUseCase } from '@/services/editItemStockUseCase'
import { useContext } from 'react'

const useEditItemStock = () => {

    const [, setItems] = useContext(DocsContext).items

    const editItemStock = async (newStock: number, itemId: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editItemStockUseCase(newStock, itemId)

        if (result.success) {

            setItems(prev =>

                prev.map(current => {

                    if (current._id === itemId) {
                        return { ...current, amount: newStock }
                    }
                    return current

                })

            )

        }

        return result

    }

    return { editItemStock }

}

export default useEditItemStock