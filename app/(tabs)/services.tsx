import { useContext, useEffect, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext, Service } from '@/context/DocsContext'
import Container from '@/components/common/Container'
import { getServicesByCategory, orderServices } from '@/functions/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import DeleteServiceForm from '@/components/services/AboutServiceForm'
import ServicesContent from '@/components/services/ServicesContent'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Service)
    const [services, setServices] = useContext(DocsContext).services
    const [category, setCategory] = useState('')

    useEffect(() => {
        if (services[0]) {
            setCategory(services[0].category)
        }   
    }, [])

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
                        services={getServicesByCategory(services, category)}
                        setServiceForDeletion={setServiceForDeletion}
                        setDeleteServiceForm={setDeleteServiceForm}
                    />
                    : <AnyItemWarning text='Nenhum item cadastrado' />
            }
            {
                addServiceForm
                    ? <AddServiceForm
                        setAddServiceForm={setAddServiceForm}
                        setCategory={setCategory}
                    />
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