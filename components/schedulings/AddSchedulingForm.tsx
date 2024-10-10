import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Scheduling, Service } from '@/context/DocsContext'
import DateInput from '../common/DateInput'
import SelectServiceInput from './SelectServiceInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { generateId } from '@/functions/common'
import { HideTabBarContext } from '@/context/HideTabBar'
import { orderSchedulings } from '@/functions/schedulings'
import FormInputs from '../common/FormInputs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import StockInfo from './StockInfo'
import AmountInput from '../common/AmountInput'
import { orderServices } from '@/functions/services'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [services, setServices] = useContext(DocsContext).services
    const [service, setService] = useState<Service>(services[0])

    const [date, setDate] = useState('')
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [amount, setAmount] = useState(0)

    const checkAllInputs = () => {

        if (service.category === 'product') {

            if (amount) {

                return true

            }

            return false

        }

        return true

    }

    const updateStock = async () => {
        if (service.category === 'product') {
            const updatedService: Service = {
                category: service.category,
                _id: service._id,
                amount: service.amount - amount,
                value: service.value
            }
            const remainingServices = services.filter(service => {
                return service._id !== updatedService._id
            })
            try {
                await AsyncStorage.setItem('services', JSON.stringify([...remainingServices, updatedService]))
                setServices(orderServices([...remainingServices, updatedService]))
            } catch (error) {
                Alert.alert('Erro ao acessar banco de dados')
            }
        }
    }

    const checkAmount = (category: string) => {

        if (category === 'product') {

            const actualServiceAmount = service.amount - amount

            if (actualServiceAmount < 0) {

                return false

            }

            return true

        }

        return true

    }

    const addScheduling = async () => {

        if (checkAllInputs()) {

            if (checkAmount(service.category)) {

                const newScheduling: Scheduling = {
                    _id: generateId(),
                    service: {
                        category: service.category,
                        _id: service._id,
                        value: service.amount ? service.value * amount : service.value,
                        amount: amount
                    },
                    date
                }

                try {

                    await updateStock()

                    await AsyncStorage.setItem('schedulings', JSON.stringify([...schedulings, newScheduling]))

                    setSchedulings(orderSchedulings([...schedulings, newScheduling]))

                    setAddSchedulingForm(false)

                    setHideTabBar(false)

                } catch (error) {

                    Alert.alert('Erro ao acessar banco de dados')

                }

            } else {

                setAddSchedulingForm(false)

                setTimeout(() => {
                    Alert.alert('Produto sem estoque')
                }, 500)

            }

        } else {

            setAddSchedulingForm(false)

            setTimeout(() => {
                Alert.alert('Todos os campos precisam ser preenchidos')
            }, 500)

        }

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer setFormOff={setAddSchedulingForm}>
            <FormBody>
                <FormTitle text={service.amount ? 'Registrar Venda' : 'Registrar Agendamento'} />
                <FormInputs>
                    <SelectServiceInput service={service} setService={setService} />
                    {service.category === 'product' && (
                        <StockInfo amount={service.amount - amount} />
                    )}
                    <DateInput setTargetDate={setDate} />
                    {service.category === 'product' && (
                        <AmountInput
                            text='Quantidade'
                            setAmount={setAmount}
                        />
                    )}
                </FormInputs>
                <SubmitFormButtons submit={addScheduling} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}