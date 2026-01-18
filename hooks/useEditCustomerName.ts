import { DocsContext } from '@/context/DocsContext'
import { editCustomerNameUseCase } from '@/services/editCustomerNameUseCase'
import { useContext } from 'react'

const useEditCustomerName = () => {

    const [, setEntries] = useContext(DocsContext).entries

    const editCustomerName = async (id: string, customerName: string): Promise<{ success: boolean, error?: string }> => {

        const result = await editCustomerNameUseCase(customerName, id)

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

        }

        return result

    }

    return { editCustomerName }

}

export default useEditCustomerName