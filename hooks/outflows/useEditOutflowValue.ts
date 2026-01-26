import { DocsContext } from '@/context/DocsContext'
import { editOutflowValueUseCase } from '@/services/outflows/editOutflowValueUseCase'
import { useContext } from 'react'

const useEditOutflowValue = () => {

    const [, setOutflows] = useContext(DocsContext).outflows

    const editOutflowValue = async (newValue: number, outflowId: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editOutflowValueUseCase(newValue, outflowId)

        if (result.success) {

            // Atualizando despesa na UI
            setOutflows(prev =>

                prev.map(current => {

                    if (current._id === outflowId) {

                        return { ...current, value: newValue }

                    }

                    return current

                })

            )

        }

        return result

    }

    return { editOutflowValue }

}

export default useEditOutflowValue