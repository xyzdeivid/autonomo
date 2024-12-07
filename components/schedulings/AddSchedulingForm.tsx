import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Scheduling, Service } from '@/context/DocsContext'
import DateInput from '../common/DateInput'
import SelectServiceInput from './SelectServiceInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { generateId } from '@/functions/common'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { getSchedulingValue, getServices } from '@/functions/schedulings'
import FormInputs from '../common/FormInputs'
import { Alert } from 'react-native'
import StockInfo from './StockInfo'
import AmountInput from '../common/AmountInput'
import { orderServices } from '@/functions/services'
import NumberInput from '../common/NumberInput'
import LoadingScreen from '../common/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NameInput from '../common/NameInput'

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
    const [costumerName, setCustomerName] = useState('')

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

        if (service.isThereAmount) {

            const updatedService: Service = {
                category: service.category,
                _id: service._id,
                isThereAmount: service.isThereAmount,
                value: service.value,
                resale: service.resale
            }

            if (updatedService.isThereAmount && service.amount)
                updatedService.amount = service.amount - amount

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

    const checkAmount = (product: Service) => {

        if (product.isThereAmount) {

            let actualServiceAmount = 0
            if (service.amount) {
                actualServiceAmount = service.amount - amount
            }

            if (actualServiceAmount < 0) {

                return false

            }

            return true

        }

        return true

    }

    const getCurrentDate = () => {
        const year = new Date().getFullYear()
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const day = String(new Date().getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const addScheduling = async () => {

        if (checkAllInputs()) {

            setLoadingScreen(true)

            const currentDate = new Date(getCurrentDate())
            const entryDate = new Date(date)

            if (entryDate <= currentDate) {

                if (checkAmount(service)) {

                    const newScheduling: Scheduling = {
                        _id: generateId(),
                        service: {
                            category: service.category,
                            _id: service._id,
                            value: getSchedulingValue(service, amount, value),
                            isThereAmount: service.isThereAmount,
                            resale: service.resale
                        },
                        date
                    }

                    if (costumerName) {
                        newScheduling.customer = costumerName
                    }

                    if (service.category === 'product')
                        newScheduling.service.amount = amount

                    if (service.category === 'product') {

                        try {

                            await updateStock()

                        } catch (err) {

                            Alert.alert('Erro ao acessar banco de dados')
                            return

                        }

                    }

                    try {

                        await AsyncStorage.setItem('schedulings', JSON.stringify([...schedulings, newScheduling]))
                        setSchedulings([...schedulings, newScheduling])

                    } catch (err) {

                        Alert.alert('Erro ao acessar banco de dados')

                    }

                } else {

                    Alert.alert('Produto sem estoque')

                }

            } else {

                Alert.alert('Não é possivel registrar entradas em datas futuras')

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
                        {service.amount ? (
                            <StockInfo amount={service.amount - amount} />
                        ) : null}
                        <NameInput 
                            setName={setCustomerName}
                            label='Cliente'
                            bgColor='rgba(0, 102, 0, 0.1)'
                            textColor='#006600'
                        />
                        <DateInput
                            setTargetDate={setDate}
                            bgColor='#006600'
                            textColor='#006600'
                        />
                        {service.category === 'product' && (
                            <AmountInput
                                text='* Quantidade'
                                setAmount={setAmount}
                                bgColor='rgba(0, 102, 0, 0.1)'
                                textColor='#006600'
                            />
                        )}
                        {
                            service.category === 'budget' && (
                                <NumberInput
                                label='* Valor'
                                    setValue={setValue}
                                    bgColor='rgba(0, 102, 0, 0.1)'
                                    textColor='#006600'
                                />
                            )
                        }
                        {
                            service.category !== 'service' && (
                                <Text style={styles.infoText}>* campo obrigatório</Text>
                            )
                        }
                    </FormInputs>
                    <SubmitFormButtons submit={addScheduling} submitButtonText='Registrar' submitButtonColor='#006600' />
                </FormBody>
            </FormContainer>
        </>
    )

}

const styles = StyleSheet.create({
    infoText: {
        color: 'rgba(0, 102, 0, 0.5)',
        fontSize: 12,
        marginBottom: 20
    }
})