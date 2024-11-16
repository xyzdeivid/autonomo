import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Scheduling, Service } from '@/context/DocsContext'
import DateInput from '../common/DateInput'
import SelectServiceInput from './SelectServiceInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { generateId } from '@/functions/common'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { getSchedulingValue, getServices, orderSchedulings } from '@/functions/schedulings'
import FormInputs from '../common/FormInputs'
import { Alert } from 'react-native'
import StockInfo from './StockInfo'
import AmountInput from '../common/AmountInput'
import { orderServices } from '@/functions/services'
import NumberInput from '../common/NumberInput'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoadingScreen from '../common/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm, setButton }: AddSchedulingFormProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [services] = useContext(DocsContext).services
    const [service, setService] = useState<Service>(getServices(services)[0])

    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [, setServices] = useContext(DocsContext).services
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [amount, setAmount] = useState(0)
    const [loadingScreen, setLoadingScreen] = useState(false)

    const checkAllInputs = (): boolean => {

        switch (service.category) {

            case 'product':
                if (amount) return true
                return false

            case 'service':
                return true

            case 'budget':
                if (value) return true
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

                await AsyncStorage.setItem('items', JSON.stringify([...remainingServices, updatedService]))
                setServices(orderServices([...remainingServices, updatedService]))

            } catch (err) {

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

            setLoadingScreen(true)

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

                if (service.category === 'product') {

                    try {

                        await updateStock()

                    } catch (err) {

                        Alert.alert('Erro ao acessar banco de dados')

                    }

                }

                try {

                    await AsyncStorage.setItem('schedulings', JSON.stringify([...schedulings, newScheduling]))
                    setSchedulings(orderSchedulings([...schedulings, newScheduling]))

                } catch (err) {

                    Alert.alert('Erro ao acessar banco de dados')

                }

            } else {

                Alert.alert('Produto sem estoque')

            }

        } else {

            Alert.alert('Todos os campos precisam ser preenchidos')

        }

        setAddSchedulingForm(false)
        setHideTabBar(false)
        setButton(true)

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
                setFormOff={setAddSchedulingForm}
                bgColor='rgba(0, 102, 0, 0.1)'
                setButton={setButton}
            >
                <FormBody borderColor='rgba(0, 102, 0, 0.1)'>
                    <FormTitle text='Nova Entrada' textColor='#006600' />
                    <FormInputs>
                        <SelectServiceInput
                            service={service}
                            setService={setService}
                            services={getServices(services)}
                        />
                        {service.category === 'product' && (
                            <StockInfo amount={service.amount - amount} />
                        )}
                        <DateInput
                            setTargetDate={setDate}
                            bgColor='#006600'
                            textColor='#006600'
                        />
                        {service.category === 'product' && (
                            <AmountInput
                                text='Quantidade'
                                setAmount={setAmount}
                                bgColor='rgba(0, 102, 0, 0.1)'
                                textColor='#006600'
                            />
                        )}
                        {
                            service.category === 'budget' && (
                                <NumberInput
                                    setValue={setValue}
                                    bgColor='rgba(0, 102, 0, 0.1)'
                                    textColor='#006600'
                                />
                            )
                        }
                    </FormInputs>
                    <SubmitFormButtons submit={addScheduling} submitButtonText='Registrar' submitButtonColor='#006600' />
                </FormBody>
            </FormContainer>
        </>
    )

}