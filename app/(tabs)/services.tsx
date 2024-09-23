import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext } from '@/context/DocsContext'
import ServicesList from '@/components/services/ServicesList'
import EditServiceForm from '@/components/services/EditServiceForm'
import Container from '@/components/common/Container'
import DeleteServiceForm from '@/components/services/DeleteServiceForm'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [editServiceForm, setEditServiceForm] = useState(false)
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [serviceForEdition, setServiceForEdition] = useState('')
    const [serviceForDeletion, setServiceForDeletion] = useState('')
    const [services] = useContext(DocsContext).services

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
                    : <AnyItemWarning />
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
                    <DeleteServiceForm
                        serviceName={serviceForDeletion}
                        setDeleteServiceForm={setDeleteServiceForm}
                    />
                    : null
            }
        </Container>
    )

}