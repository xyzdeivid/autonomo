import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { DocsContext, Scheduling, Service } from '@/context/DocsContext'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterSchedulings } from '@/functions/common'
import AddSchedulingButton from '@/components/schedulings/AddSchedulingButton'

import { getServices, orderSchedulings } from '@/functions/schedulings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeleteSchedulingForm from '@/components/schedulings/AboutSchedulingCard'
import { orderServices } from '@/functions/services'
import { Alert } from 'react-native'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [services, setServices] = useContext(DocsContext).services
    const [selectedMonth] = useContext(MonthContext)
    const [schedulingForDeletion, setSchedulingForDeletion] = useState({} as Scheduling)
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)

    const checkAmount = async (scheduling: Scheduling) => {

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
            const updatedProduct: Service = {
                category: product.category,
                _id: product._id,
                value: product.value,
                amount: product.amount + scheduling.service.amount
            }

            try {

                await AsyncStorage.setItem('services', JSON.stringify([...remainingProducts, updatedProduct]))

                setServices(orderServices([...remainingProducts, updatedProduct]))

            } catch (error) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        }

    }

    const deleteScheduling = async (scheduling: Scheduling) => {

        if (scheduling.service.category === 'product')
            await checkAmount(scheduling)

        const remainingSchedulings = schedulings.filter(current => {
            return current._id !== scheduling._id
        })

        try {

            await AsyncStorage.setItem('schedulings', JSON.stringify(remainingSchedulings))

            setSchedulings(orderSchedulings(remainingSchedulings))

            setDeleteSchedulingForm(false)

        } catch (error) {

            Alert.alert('Erro ao acessar banco de dados')

        }

    }

    return (
        <Container>
            {
                schedulings[0] && (
                    <MonthInput />
                )
            }
            {
                filterSchedulings(schedulings, selectedMonth)[0]
                    ? <SchedulingsList
                        filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                        setSchedulingForDeletion={setSchedulingForDeletion}
                        setDeleteSchedulingForm={setDeleteSchedulingForm}
                    />
                    : <AnyItemWarning text='Nenhuma entrada cadastrada' />
            }
            {
                addSchedulingForm
                    ? <AddSchedulingForm
                        setAddSchedulingForm={setAddSchedulingForm}
                        services={getServices(services)}
                    />
                    : <AddSchedulingButton
                        setAddSchedulingForm={setAddSchedulingForm}
                    />
            }
            {
                deleteSchedulingForm
                    ? <DeleteSchedulingForm
                        scheduling={schedulingForDeletion}
                        deleteFunction={deleteScheduling}
                        setFormOff={setDeleteSchedulingForm}
                    />
                    : null
            }
        </Container>
    )

}