import { useContext, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Scheduling, Service } from '@/context/DocsContext'
import DateInput from '../common/DateInput'
import SelectServiceInput from './SelectServiceInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { format, parseISO } from 'date-fns'

interface AddSchedulingFormProps {
    setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSchedulingForm({ setAddSchedulingForm }: AddSchedulingFormProps) {

    const [services] = useContext(DocsContext).services
    const [service, setService] = useState<Service>(services[0])
    const [date, setDate] = useState('')
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    const addScheduling = () => { 
        const newScheduling: Scheduling = {
            _id: `${service._id} (${dateFormat(date)})`,
            service,
            date
        }
        setSchedulings([...schedulings, newScheduling])
        setAddSchedulingForm(false)
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Agendamento' />
                <SelectServiceInput service={service} setService={setService} />
                <DateInput setTargetDate={setDate} />
                <SubmitFormButtons submit={addScheduling} setFormOff={setAddSchedulingForm} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}