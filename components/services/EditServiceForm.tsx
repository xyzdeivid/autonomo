import { Pressable, StyleSheet, Text } from 'react-native'
import FormBody from '../common/FormBody'
import { useContext, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'

interface EditServiceFormProps {
    service: string
    setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditServiceForm({ service, setEditServiceForm }: EditServiceFormProps) {

    const [services, setServices] = useContext(DocsContext).services
    const [value, setValue] = useState(0)

    const editService = () => {
        // Separando os serviços que não serão editados
        const otherServices = services.filter(current => {
            return current._id !== service
        })
        const editedService = {
            _id: service,
            value
        }
        setServices([...otherServices, editedService])
        setEditServiceForm(false)
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Editar Serviço' />
                <Text style={styles.serviceName}>{service}</Text>
                <NumberInput setValue={setValue} />
                <SubmitFormButtons submit={editService} setFormOff={setEditServiceForm} submitButtonText='Editar' />
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    serviceName: {
        fontSize: 20
    }
})