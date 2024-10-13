import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext, Service } from '@/context/DocsContext'
import Container from '@/components/common/Container'
import { orderServices } from '@/functions/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import DeleteServiceForm from '@/components/services/AboutServiceForm'
import ServicesContent from '@/components/services/ServicesContent'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Service)
    const [services, setServices] = useContext(DocsContext).services
    const [category, setCategory] = useState(0)

    const deleteService = async (id: string) => {

        const remainingServices = services.filter(service => {
            return service._id !== id
        })

        try {

            await AsyncStorage.setItem('services', JSON.stringify(remainingServices))

            setServices(orderServices(remainingServices))

            setDeleteServiceForm(false)

        } catch (error) {

            Alert.alert('Erro ao salvar no banco de dados')

        }

    }

    return (
        <Container>
            {
                services[0]
                    ? <ServicesContent
                        category={category}
                        setCategory={setCategory}
                        services={services}
                        setServiceForDeletion={setServiceForDeletion}
                        setDeleteServiceForm={setDeleteServiceForm}
                    />
                    : <AnyItemWarning text='Nenhum produto ou serviço cadastrado' />
            }
            {
                addServiceForm
                    ? <AddServiceForm setAddServiceForm={setAddServiceForm} />
                    : <AddItemButton setForm={setAddServiceForm} />
            }
            {
                deleteServiceForm
                    ? <DeleteServiceForm
                        service={serviceForDeletion}
                        deleteFunction={deleteService}
                        setFormOff={setDeleteServiceForm}
                    />
                    : null
            }
        </Container>
    )

}