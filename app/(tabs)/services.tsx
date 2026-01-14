// native functions
import { useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

// custom functions
import { getServicesByCategory, getCategoryAndSet } from '@/functions/services'

// context
import { DocsContext } from '@/context/DocsContext'
import { Item } from '@/types'
import { MainDisplaysContext } from '@/context/MainDisplays'

// common components
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddItemForm'
import Container from '@/components/common/Container'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// service components
import AboutServiceCard from '@/components/services/AboutItemCard'
import ServicesContent from '@/components/services/ServicesContent'
import useDeleteItem from '@/hooks/useDeleteItem'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [aboutServiceCard, setAboutServiceCard] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Item)
    const appDocs = useContext(DocsContext)
    const [services] = appDocs.items
    const [currentPage] = appDocs.currentPage
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    const deleteItem = useDeleteItem().deleteItem

    useEffect(() => {
        getCategoryAndSet(services, setCategory)
    }, [services])

    useEffect(() => {
        if (currentPage !== 'services') {
            setAddServiceForm(false)
            setAboutServiceCard(false)
        }
    }, [currentPage])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setAddServiceForm(false)
            return null
        })
    }, [])

    const deleteService = async (id: string) => {

        setLoadingScreen(true)

        await deleteItem(id)

        setAboutServiceCard(false)
        setLoadingScreen(false)
        setHideTabBar(false)

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
                        : <AnyInfoWarning
                            text='listamos todos os seus produtos ou serviços.'
                            titleBgColor='#330066'
                            textBgColor='rgba(51, 0, 102, 0.1)'
                        />
                }

                <AddItemButton
                    setForm={setAddServiceForm}
                    text='Registrar Produto/Serviço'
                    mainColor='#330066'
                    bgColor='rgba(51, 0, 102, 0.1)'
                />
                {
                    addServiceForm
                    && <AddServiceForm
                        setAddServiceForm={setAddServiceForm}
                    />
                }
                {
                    aboutServiceCard
                        ? <AboutServiceCard
                            service={serviceForDeletion}
                            deleteFunction={deleteService}
                            setFormOff={setAboutServiceCard}
                        />
                        : null
                }
            </Container>
        </>
    )

}