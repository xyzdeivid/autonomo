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

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [amount, setAmount] = useState(0)
    const [services] = useContext(DocsContext).services
    const [service, setService] = useState<Service>(services[0])
    const [actualServiceAmount, setActualServiceAmount] = useState(service.amount || 0)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    useEffect(() => {
        if (service.amount) 
        setActualServiceAmount(service.amount - amount)
    }, [amount])
    
    const [date, setDate] = useState('')
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings

    const addScheduling = async () => {

        const newScheduling: Scheduling = {
            _id: generateId(),
            service,
            date
        }

        try {

            await AsyncStorage.setItem('schedulings', JSON.stringify([...schedulings, newScheduling]))

            setSchedulings(orderSchedulings([...schedulings, newScheduling]))

            setAddSchedulingForm(false)

            setHideTabBar(false)

        } catch (error) {

            Alert.alert('Erro ao acessar banco de dados')
            
        }

    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Agendamento / Venda' />
                <FormInputs>
                    <SelectServiceInput service={service} setService={setService} />
                    {service.amount && (
                        <StockInfo amount={actualServiceAmount} />
                    )}
                    <DateInput setTargetDate={setDate} />
                    {service.amount && (
                        <AmountInput setAmount={setAmount} />
                    )}
                </FormInputs>
                <SubmitFormButtons submit={addScheduling} setFormOff={setAddSchedulingForm} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}