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

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const [services] = useContext(DocsContext).services
    const [service, setService] = useState<Service>(services[0])
    const [date, setDate] = useState('')
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings

    const addScheduling = () => {

        const newScheduling: Scheduling = {
            _id: generateId(),
            service,
            date
        }

        setSchedulings(orderSchedulings([...schedulings, newScheduling]))

        setAddSchedulingForm(false)

        setHideTabBar(false)

    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Agendamento' />
                <FormInputs>
                    <SelectServiceInput service={service} setService={setService} />
                    <DateInput setTargetDate={setDate} />
                </FormInputs>
                <SubmitFormButtons submit={addScheduling} setFormOff={setAddSchedulingForm} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}