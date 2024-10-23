import { useContext, useEffect, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext, Service } from '@/context/DocsContext'
import Container from '@/components/common/Container'
import { getServicesByCategory, orderServices, getCategoryAndSet } from '@/functions/services'
import AboutServiceCard from '@/components/services/AboutServiceForm'
import ServicesContent from '@/components/services/ServicesContent'
import LoadingScreen from '@/components/common/LoadingScreen'
import { HideTabBarContext } from '@/context/HideTabBar'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [aboutServiceCard, setAboutServiceCard] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Service)
    const [services, setServices] = useContext(DocsContext).services
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [button, setButton] = useState(true)

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
            setAboutServiceCard(false)
            setLoadingScreen(false)
            setHideTabBar(false)
            setButton(true)
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
                            setDeleteServiceForm={setAboutServiceCard}
                        />
                        : <AnyItemWarning text='Nenhum item cadastrado' />
                }
                {
                    button
                    && <AddItemButton
                        setForm={setAddServiceForm}
                        text='Novo Item'
                        bgColor='#330066'
                        setButton={setButton}
                    />
                }
                {
                    addServiceForm
                    && <AddServiceForm
                        setAddServiceForm={setAddServiceForm}
                        setCategory={setCategory}
                        setButton={setButton}
                    />
                }
                {
                    aboutServiceCard
                        ? <AboutServiceCard
                            service={serviceForDeletion}
                            deleteFunction={deleteService}
                            setFormOff={setAboutServiceCard}
                            setButton={setButton}
                        />
                        : null
                }
            </Container>
        </>
    )

}