import { DocsContext } from '@/context/DocsContext'
import { editOutflowDateUseCase } from '@/services/editOutflowDateUseCase'
import { useContext } from 'react'

const useEditOutflowDate = () => {

    const [, setOutflows] = useContext(DocsContext).outflows

    const editOutflowDate = async (newDate: string, outflowId: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editOutflowDateUseCase(newDate, outflowId)

        if (result.success) {

            // Atualizando despesa editada na UI
            setOutflows(prev =>

                prev.map(current => {

                    if (current._id === outflowId) {

                        return { ...current, date: newDate }

                    }

                    return current

                })

            )

        }

        return result

    }

    return { editOutflowDate }

}

export default useEditOutflowDate