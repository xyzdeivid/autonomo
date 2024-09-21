import { Pressable, Text } from 'react-native'
import FormBody from '../common/FormBody'
import { useContext, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'
import NumberInput from '../common/NumberInput'

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
        <FormBody>
            <Text>{service}</Text>
            <NumberInput setValue={setValue} />
            <Pressable onPress={() => editService()}>
                <Text style={{ color: 'white' }}>Confirmar</Text>
            </Pressable>
            <Pressable onPress={() => setEditServiceForm(false)}>
                <Text>Cancelar</Text>
            </Pressable>
        </FormBody>
    )

}