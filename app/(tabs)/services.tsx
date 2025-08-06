// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// custom functions
import { getServicesByCategory, orderServices, getCategoryAndSet } from '@/functions/services'

// context
import { DocsContext, Item } from '@/context/DocsContext'
import { MainDisplaysContext } from '@/context/MainDisplays'

// common components
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import Container from '@/components/common/Container'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// service components
import AboutServiceCard from '@/components/services/AboutServiceCard'
import ServicesContent from '@/components/services/ServicesContent'
import WhatIsServiceCard from '@/components/services/WhatIsServiceCard'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [aboutServiceCard, setAboutServiceCard] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Item)
    const appDocs = useContext(DocsContext)
    const [services, setServices] = appDocs.items
    const [currentPage] = appDocs.currentPage
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [button, setButton] = useState(true)
    const [whatIsServiceCard, setWhatIsServiceCard] = useState(false)

    useEffect(() => {
        getCategoryAndSet(services, setCategory)
    }, [services])

    useEffect(() => {
        if (currentPage !== 'services') {
            setAddServiceForm(false)
            setAboutServiceCard(false)
            setWhatIsServiceCard(false)
            setButton(true)
        }
    }, [currentPage])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setAddServiceForm(false)
            setButton(true)
            return null
        })
    }, [])

    const deleteService = async (id: string) => {

        setLoadingScreen(true)

        const remainingServices = services.filter(service => {
            return service._id !== id
        })

        try {

            await AsyncStorage.setItem('items', JSON.stringify(remainingServices))
            setServices(orderServices(remainingServices))

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

        setAboutServiceCard(false)
        setLoadingScreen(false)
        setHideTabBar(false)
        setButton(true)

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
                            page='item'
                            text='listamos todos os seus itens de trabalho.'
                            titleBgColor='#330066'
                            textBgColor='rgba(51, 0, 102, 0.1)'
                        />
                }
                {
                    button
                    && <AddItemButton
                        setForm={setAddServiceForm}
                        text='Novo Item'
                        mainColor='#330066'
                        bgColor='rgba(51, 0, 102, 0.1)'
                        setButton={setButton}
                        infoButtonColor='rgba(51, 0, 102, 0.5)'
                        setInfoCard={setWhatIsServiceCard}
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
                {whatIsServiceCard &&
                    <WhatIsServiceCard
                        setWhatIsServiceCard={setWhatIsServiceCard}
                        setButton={setButton}
                    />}
            </Container>
        </>
    )

}