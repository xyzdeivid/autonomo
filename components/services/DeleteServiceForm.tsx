import { useContext } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { DocsContext } from '@/context/DocsContext'

interface DeleteServiceFormProps {
    serviceName: string
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteServiceForm({ serviceName, setDeleteServiceForm }: DeleteServiceFormProps) {

    const [services, setServices] = useContext(DocsContext).services

    const deleteService = (id: string) => {
        const remainingServices = services.filter(service => {
            return service._id !== id
        })
        setServices(remainingServices)
        setDeleteServiceForm(false)
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Excluir ${serviceName}?`} />
                <SubmitFormButtons submit={() => deleteService(serviceName)} setFormOff={setDeleteServiceForm} submitButtonText='Excluir' />
            </FormBody>
        </FormContainer>
    )

}