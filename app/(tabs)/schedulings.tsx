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
import { db } from '@/database/db'

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
            return current._id === scheduling.serviceId
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

            if (scheduling.serviceAmount && product.isThereAmount)
                updatedProduct.amount = product.amount
                    ? product.amount + scheduling.serviceAmount
                    : 0 + scheduling.serviceAmount

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

        if (scheduling.serviceIsThereAmount) {

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

            await db.runAsync(
                'DELETE FROM entries WHERE _id = ?',
                [scheduling._id]
            )
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
                            text='listamos todas as suas receitas financeiras do mês.'
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
            </Container>
        </>
    )

}