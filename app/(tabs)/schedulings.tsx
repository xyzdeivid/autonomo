// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// custom functions
import { filterSchedulings } from '@/functions/common'
import { orderServices } from '@/functions/services'

// context
import { DocsContext, Entry, Item } from '@/context/DocsContext'
import { MainDisplaysContext } from '@/context/MainDisplays'

// common components
import Container from '@/components/common/Container'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'
import LoadingScreen from '@/components/common/LoadingScreen'

// scheduling components
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import AddSchedulingButton from '@/components/schedulings/AddSchedulingButton'
import DeleteSchedulingForm from '@/components/schedulings/AboutSchedulingCard'
import WhatIsSchedulingCard from '@/components/schedulings/WhatIsSchedulingCard'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulingForDeletion, setSchedulingForDeletion] = useState({} as Entry)
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [button, setButton] = useState(true)
    const [whatIsSchedulingCard, setWhatIsSchedulingCard] = useState(false)

    const appDocs = useContext(DocsContext)
    const [schedulings, setSchedulings] = appDocs.entries
    const [services, setServices] = appDocs.items
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

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

    useEffect(() => {
        if (currentPage !== 'schedulings') {
            setAddSchedulingForm(false)
            setDeleteSchedulingForm(false)
            setWhatIsSchedulingCard(false)
            setButton(true)
        }
    }, [currentPage])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setAddSchedulingForm(false)
            setButton(true)
            return null
        })
    }, [])

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
                            text='listamos todas as suas entradas de capital do mês.'
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