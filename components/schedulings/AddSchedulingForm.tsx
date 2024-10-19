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
import { getSchedulingValue, orderSchedulings } from '@/functions/schedulings'
import FormInputs from '../common/FormInputs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import StockInfo from './StockInfo'
import AmountInput from '../common/AmountInput'
import { orderServices } from '@/functions/services'
import NumberInput from '../common/NumberInput'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    services: Service[]
}

export default function AddSchedulingForm({ setAddSchedulingForm, services }: AddSchedulingFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [service, setService] = useState<Service>(services[0])

    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [, setServices] = useContext(DocsContext).services
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [amount, setAmount] = useState(0)

    const checkAllInputs = (): boolean => {

        switch (service.category) {

            case 'product':
                if (amount) return true
                return false

            case 'service':
                return true

            case 'budget':
                if(value) return true
                return false
 
            default:
                return false

        }

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
                        value: getSchedulingValue(service, amount, value),
                        amount: amount
                    },
                    date
                }

                try {

                    await updateStock()

                    await AsyncStorage.setItem('schedulings', JSON.stringify([...schedulings, newScheduling]))

                    setSchedulings(orderSchedulings([...schedulings, newScheduling]))

                } catch (error) {

                    Alert.alert('Erro ao acessar banco de dados')

                }

            } else {

                setTimeout(() => {
                    Alert.alert('Produto sem estoque')
                }, 500)

            }

        } else {

            setTimeout(() => {
                Alert.alert('Todos os campos precisam ser preenchidos')
            }, 500)

        }

        setAddSchedulingForm(false)
        setHideTabBar(false)

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer setFormOff={setAddSchedulingForm}>
            <FormBody>
                <FormTitle text='Registrar Entrada'>
                    <MaterialCommunityIcons name='format-float-right' size={24} color='darkgray' />
                </FormTitle>
                <FormInputs>
                    <SelectServiceInput
                        service={service}
                        setService={setService}
                        services={services}
                    />
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
                    {
                        service.category === 'budget' && (
                            <NumberInput
                                setValue={setValue}
                            />
                        )
                    }
                </FormInputs>
                <SubmitFormButtons submit={addScheduling} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}