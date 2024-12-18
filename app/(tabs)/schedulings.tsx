import { useContext, useState } from 'react'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { DocsContext, Entry, Item } from '@/context/DocsContext'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import { filterSchedulings } from '@/functions/common'
import AddSchedulingButton from '@/components/schedulings/AddSchedulingButton'

import DeleteSchedulingForm from '@/components/schedulings/AboutSchedulingCard'
import { orderServices } from '@/functions/services'
import { MainDisplaysContext } from '@/context/MainDisplays'
import LoadingScreen from '@/components/common/LoadingScreen'
import WhatIsSchedulingCard from '@/components/schedulings/WhatIsSchedulingCard'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const appDocs = useContext(DocsContext)
    const [schedulings, setSchedulings] = appDocs.entries
    const [services, setServices] = appDocs.items
    const [selectedMonth] = appDocs.selectedMonth
    const [schedulingForDeletion, setSchedulingForDeletion] = useState({} as Entry)
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [button, setButton] = useState(true)
    const [whatIsSchedulingCard, setWhatIsSchedulingCard] = useState(false)
    const [currentYear] = appDocs.currentYear

    const checkAmount = async (scheduling: Entry) => {

        // Separando produto a ser atualizado
        const product = services.filter(current => {
            return current._id === scheduling.service._id
        })[0]

        // Verificando se o produto ainda está cadastrado no sistema
        if (product) {

            // Separando outros produtos
            const remainingProducts = services.filter(current => {
                return current !== product
            })

            // Atualizando estoque do produto
            const updatedProduct: Item = {
                category: product.category,
                _id: product._id,
                value: product.value,
                isThereAmount: product.isThereAmount,
                resale: product.resale
            }

            if (scheduling.service.amount && product.isThereAmount)
                updatedProduct.amount = product.amount
                    ? product.amount + scheduling.service.amount
                    : 0 + scheduling.service.amount

            try {

                await AsyncStorage.setItem('items', JSON.stringify([...remainingProducts, updatedProduct]))
                setServices(orderServices([...remainingProducts, updatedProduct]))

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        }

    }

    const deleteScheduling = async (scheduling: Entry) => {

        setLoadingScreen(true)

        if (scheduling.service.isThereAmount) {

            try {

                await checkAmount(scheduling)

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')
                return

            }

        }


        const remainingSchedulings = schedulings.filter(current => {
            return current._id !== scheduling._id
        })

        try {

            await AsyncStorage.setItem('schedulings', JSON.stringify(remainingSchedulings))
            setSchedulings(remainingSchedulings)

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

        setDeleteSchedulingForm(false)
        setLoadingScreen(false)
        setHideTabBar(false)
        setButton(true)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    filterSchedulings(schedulings, selectedMonth, currentYear)[0]
                        ? <SchedulingsList
                            filteredSchedulings={filterSchedulings(schedulings, selectedMonth, currentYear)}
                            setSchedulingForDeletion={setSchedulingForDeletion}
                            setDeleteSchedulingForm={setDeleteSchedulingForm}
                        />
                        : <AnyInfoWarning
                            page='entrada'
                            text='Neste página, listamos todas as suas entradas de capital do mês.'
                            titleBgColor='#006600'
                            textBgColor='rgba(0, 102, 0, 0.1)'
                        />
                }
                {
                    button
                    && <AddSchedulingButton
                        setAddSchedulingForm={setAddSchedulingForm}
                        setButton={setButton}
                        setWhatIsSchedulingCard={setWhatIsSchedulingCard}
                    />
                }
                {
                    addSchedulingForm
                    && <AddSchedulingForm
                        setAddSchedulingForm={setAddSchedulingForm}
                        setButton={setButton}
                    />
                }
                {
                    deleteSchedulingForm
                        ? <DeleteSchedulingForm
                            scheduling={schedulingForDeletion}
                            deleteFunction={deleteScheduling}
                            setFormOff={setDeleteSchedulingForm}
                            setButton={setButton}
                        />
                        : null
                }
                {whatIsSchedulingCard &&
                    <WhatIsSchedulingCard
                        setWhatIsSchedulingCard={setWhatIsSchedulingCard}
                        setButton={setButton}
                    />
                }
            </Container>
        </>
    )

}