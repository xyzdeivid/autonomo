import { DocsContext } from '@/context/DocsContext'
import { editOutflowNameUseCase } from '@/services/editOutflowNameUseCase'
import { useContext } from 'react'

const useEditOutflowName = () => {

    const [, setOutflows] = useContext(DocsContext).outflows

    const editOutflowName = async (newName: string, outflowId: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editOutflowNameUseCase(newName, outflowId)

        if (result.success) {

            // Atualizando despesas na UI
            setOutflows(prev =>

                prev.map(current => {

                    if (current._id === outflowId) {

                        return { ...current, name: newName }

                    }

                    return current

                })

            )

        }

        return result

    }

    return { editOutflowName }

}

export default useEditOutflowName