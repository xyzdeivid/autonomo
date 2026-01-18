import { DocsContext } from '@/context/DocsContext'
import { editEntryDateUseCase } from '@/services/editEntryDateUseCase'
import { useContext } from 'react'

const useEditEntryDate = () => {

    const [, setEntries] = useContext(DocsContext).entries

    const editEntryDate = async (newDate: string, id: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editEntryDateUseCase(newDate, id)

        if (result.success) {

            // Atualizando data de receita na UI
            setEntries(prev =>
                prev.map(entry => {

                    if (entry._id === id) {

                        return {
                            ...entry, date: newDate
                        }

                    }

                    return entry

                })
            )

        }

        return result

    }

    return { editEntryDate }

}

export default useEditEntryDate