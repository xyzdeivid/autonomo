import { useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Scheduling, Service } from '@/context/DocsContext'
import DateInput from '../common/DateInput'
import SelectServiceInput from './SelectServiceInput'
import SubmitFormButtons from '../common/SubmitFormButtons'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const [service, setService] = useState<Service>({} as Service)
    const [date, setDate] = useState('')

    const addScheduling = () => { 
        const newScheduling: Scheduling = {
            service,
            date
        }
        setAddSchedulingForm(false)
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Agendamento' />
                <SelectServiceInput setService={setService} />
                <DateInput setTargetDate={setDate} />
                <SubmitFormButtons submit={addScheduling} setFormOff={setAddSchedulingForm} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}