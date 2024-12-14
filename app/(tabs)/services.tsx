import { useContext, useEffect, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/services/AddServiceForm'
import { DocsContext, Item } from '@/context/DocsContext'
import Container from '@/components/common/Container'
import { getServicesByCategory, orderServices, getCategoryAndSet } from '@/functions/services'
import AboutServiceCard from '@/components/services/AboutServiceCard'
import ServicesContent from '@/components/services/ServicesContent'
import LoadingScreen from '@/components/common/LoadingScreen'
import { MainDisplaysContext } from '@/context/MainDisplays'
import WhatIsServiceCard from '@/components/services/WhatIsServiceCard'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

export default function Services() {

    const [addServiceForm, setAddServiceForm] = useState(false)
    const [aboutServiceCard, setAboutServiceCard] = useState(false)
    const [serviceForDeletion, setServiceForDeletion] = useState({} as Item)
    const [services, setServices] = useContext(DocsContext).items
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [button, setButton] = useState(true)
    const [whatIsServiceCard, setWhatIsServiceCard] = useState(false)

    useEffect(() => {
        getCategoryAndSet(services, setCategory)
    }, [services])

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

    useEffect(() => {
        AsyncStorage.getItem('items-experienced')
        .then(experienced => {
            if (!experienced) {
                setWhatIsServiceCard(true)
                AsyncStorage.setItem('items-experienced', 'experienced')
                .catch(() => Alert.alert('Erro ao acessar banco de dados'))
            }
        })
        .catch(() => Alert.alert('Erro ao acessar banco de dados'))
    }, [])

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