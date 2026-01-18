import { DocsContext } from '@/context/DocsContext'
import { addCustomerUseCase } from '@/services/addCustomerUseCase'
import { useContext } from 'react'

const useAddCustomerName = () => {

    const [, setEntries] = useContext(DocsContext).entries

    const addCustomerName = async (id: string, customerName: string): Promise<{ success: boolean, error?: string }> => {

        const result = await addCustomerUseCase(customerName, id)

        if (result.success) {

            // Atualizado receita editada na UI
            setEntries(prev =>

                prev.map(entry => {

                    if (entry._id === id) {

                        return {
                            ...entry, customer: customerName
                        }

                    }

                    return entry

                })
            )

            return {
                success: true
            }

        }

        return result

    }

    return { addCustomerName }

}

export default useAddCustomerName