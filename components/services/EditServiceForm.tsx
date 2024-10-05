import { Alert, StyleSheet, Text } from 'react-native'
import FormBody from '../common/FormBody'
import { useContext, useEffect, useState } from 'react'
import { DocsContext, Service } from '@/context/DocsContext'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { HideTabBarContext } from '@/context/HideTabBar'
import { checkTitle, orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface EditServiceFormProps {
    service: Service
    setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditServiceForm({ service, setEditServiceForm }: EditServiceFormProps) {

    const [services, setServices] = useContext(DocsContext).services
    const [value, setValue] = useState(0)
    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const editService = async () => {

        // Separando os serviços que não serão editados
        const otherServices = services.filter(current => {
            return current._id !== service._id
        })

        const editedService = {} as Service

        editedService.category = service.category
        editedService._id = service._id
        editedService.value = service.value

        if (editedService.category === 'product') {
            editedService.amount = service.amount
        }

        try {

            await AsyncStorage.setItem('services', JSON.stringify([...otherServices, editedService]))

            setServices(orderServices([...otherServices, editedService]))

            setEditServiceForm(false)

        } catch (error) {

            Alert.alert('Erro ao salvar no banco de dados')

        }



    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Editar ${checkTitle(service)}`} />
                <FormInputs>
                    <Text style={styles.serviceName}>{service._id}</Text>
                    <NumberInput setValue={setValue} />
                </FormInputs>
                <SubmitFormButtons submit={editService} setFormOff={setEditServiceForm} submitButtonText='Editar' />
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    serviceName: {
        fontSize: 20,
        marginBottom: 20
    }
})