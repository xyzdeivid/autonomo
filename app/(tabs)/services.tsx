import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext } from '@/context/DocsContext'
import ServicesList from '@/components/services/ServicesList'
import EditServiceForm from '@/components/services/EditServiceForm'
import Container from '@/components/common/Container'
import DeleteForm from '@/components/common/DeleteForm'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [editServiceForm, setEditServiceForm] = useState(false)
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [serviceForEdition, setServiceForEdition] = useState('')
    const [serviceForDeletion, setServiceForDeletion] = useState('')
    const [services, setServices] = useContext(DocsContext).services

    const deleteService = (id: string) => {
        const remainingServices = services.filter(service => {
            return service._id !== id
        })
        setServices(remainingServices)
        setDeleteServiceForm(false)
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
                    : <AnyItemWarning text='Nenhum serviço cadastrado' />
            }
            {
                addServiceForm
                    ? <AddServiceForm setAddServiceForm={setAddServiceForm} />
                    : <AddItemButton setForm={setAddServiceForm} bgColor='#000033' />
            }
            {
                editServiceForm
                    ? <EditServiceForm service={serviceForEdition} setEditServiceForm={setEditServiceForm} />
                    : null
            }
            {
                deleteServiceForm
                    ?
                    <DeleteForm
                        targetName={serviceForDeletion}
                        deleteFunction={deleteService}
                        setFormOff={setDeleteServiceForm}
                    />
                    : null
            }
        </Container>
    )

}