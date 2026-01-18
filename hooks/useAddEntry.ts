import { Entry, Item } from '@/types/index'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { addEntryUseCase } from '@/services/addEntryUseCase'

const useAddEntry = () => {

    const appDocs = useContext(DocsContext)
    const [, setEntries] = appDocs.entries
    const [, setItems] = appDocs.items

    const addEntry = async (entry: Entry, item?: Item): Promise<{ success: boolean, error?: string }> => {

        const result = await addEntryUseCase(entry, item)

        if (result.success) {

            // Atualizando receitas na UI
            setEntries(prev => [...prev, entry])

            // Atualizando produto na UI se necessário
            if (item) {

                setItems(prev =>

                    prev.map(current => {

                        if (current._id === item._id) {

                            return { ...current, amount: result.newStock }

                        }

                        return current

                    })

                )

            }

            return {
                success: true
            }

        }

        return result

    }

    return { addEntry }

}

export default useAddEntry