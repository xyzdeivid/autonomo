import { useContext, useEffect, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext, Service } from '@/context/DocsContext'
import Container from '@/components/common/Container'
import { getServicesByCategory, orderServices, getCategoryAndSet } from '@/functions/services'
import DeleteServiceForm from '@/components/services/AboutServiceForm'
import ServicesContent from '@/components/services/ServicesContent'
import LoadingScreen from '@/components/common/LoadingScreen'
import { HideTabBarContext } from '@/context/HideTabBar'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Service)
    const [services, setServices] = useContext(DocsContext).services
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        getCategoryAndSet(services, setCategory)
    }, [services])

    const deleteService = (id: string) => {

        setLoadingScreen(true)

        const remainingServices = services.filter(service => {
            return service._id !== id
        })

        setTimeout(() => {
            setServices(orderServices(remainingServices))
            setDeleteServiceForm(false)
            setLoadingScreen(false)
            setHideTabBar(false)
        }, 500)

    }

    return (
        <>
        {loadingScreen && <LoadingScreen />}
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
        </>
    )

}