import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { DocsContext } from '@/context/DocsContext'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import DeleteForm from '@/components/common/DeleteForm'
import MonthInput from '@/components/common/MonthInput'
import { View } from 'react-native'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [services] = useContext(DocsContext).services
    const [schedulingForDeletion, setSchedulingForDeletion] = useState('')
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)

    const deleteScheduling = (id: string) => {
        const remainingSchedulings = schedulings.filter(scheduling => {
            return scheduling._id !== id
        })
        setSchedulings(remainingSchedulings)
        setDeleteSchedulingForm(false)
    }

    const SchedulingsContent = () => (
        <View>
            <MonthInput />
            <SchedulingsList setSchedulingForDeletion={setSchedulingForDeletion} setDeleteSchedulingForm={setDeleteSchedulingForm} />
        </View>
    )

    return (
        <Container>
            {
                schedulings[0]
                    ? <SchedulingsContent />
                    : <AnyItemWarning text='Nenhum agendamento cadastrado' />
            }
            {
                addSchedulingForm
                    ? <AddSchedulingForm setAddSchedulingForm={setAddSchedulingForm} />
                    : services[0] && (<AddItemButton setForm={setAddSchedulingForm} bgColor='darkblue' />)
            }
            {
                deleteSchedulingForm
                    ? <DeleteForm targetName={schedulingForDeletion} deleteFunction={deleteScheduling} setFormOff={setDeleteSchedulingForm} />
                    : null
            }
        </Container>
    )

}