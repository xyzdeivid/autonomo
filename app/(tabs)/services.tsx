import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext, Service } from '@/context/DocsContext'
import ServicesList from '@/components/services/ServicesList'
import EditServiceForm from '@/components/services/EditServiceForm'
import Container from '@/components/common/Container'
import DeleteForm from '@/components/common/DeleteForm'
import { orderServices } from '@/functions/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import DeleteExpenseForm from '@/components/expenses/DeleteExpenseForm'
import DeleteServiceForm from '@/components/services/DeleteServiceForm'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [editServiceForm, setEditServiceForm] = useState(false)
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [serviceForEdition, setServiceForEdition] = useState({} as Service)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Service)
    const [services, setServices] = useContext(DocsContext).services

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
                    ? <ServicesList
                        setEditServiceForm={setEditServiceForm}
                        setServiceForEdition={setServiceForEdition}
                        setServiceForDeletion={setServiceForDeletion}
                        setDeleteServiceForm={setDeleteServiceForm}
                    />
                    : <AnyItemWarning text='Nenhum serviço ou produto cadastrado' />
            }
            {
                addServiceForm
                    ? <AddServiceForm setAddServiceForm={setAddServiceForm} />
                    : <AddItemButton setForm={setAddServiceForm} />
            }
            {
                editServiceForm
                    ? <EditServiceForm service={serviceForEdition} setEditServiceForm={setEditServiceForm} />
                    : null
            }
            {
                deleteServiceForm
                    ? <DeleteServiceForm service={serviceForDeletion} deleteFunction={deleteService} setFormOff={setDeleteServiceForm} />
                    : null
            }
        </Container>
    )

}