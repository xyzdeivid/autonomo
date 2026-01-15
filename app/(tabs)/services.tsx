// native functions
import { useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

// custom functions
import { getServicesByCategory, getCategoryAndSet } from '@/functions/services'

// context
import { DocsContext } from '@/context/DocsContext'
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

    const appDocs = useContext(DocsContext)
    const [items] = appDocs.items
    const [addServiceForm, setAddServiceForm] = useState(false)
    const [aboutServiceCard, setAboutServiceCard] = useState(false)
    const [selectedItemForDeletion, setSelectedItemForDeletion] = useState('')
    const itemForDeletion = items.find(e => e._id === selectedItemForDeletion)
    const [currentPage] = appDocs.currentPage
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    const deleteItem = useDeleteItem().deleteItem

    useEffect(() => {
        getCategoryAndSet(items, setCategory)
    }, [items])

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
                    items[0]
                        ? <ServicesContent
                            category={category}
                            setCategory={setCategory}
                            services={getServicesByCategory(items, category)}
                            setSelectedItemForDeletion={setSelectedItemForDeletion}
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
                    (aboutServiceCard && itemForDeletion)
                        ? <AboutServiceCard
                            service={itemForDeletion}
                            deleteFunction={deleteService}
                            setFormOff={setAboutServiceCard}
                        />
                        : null
                }
            </Container>
        </>
    )

}