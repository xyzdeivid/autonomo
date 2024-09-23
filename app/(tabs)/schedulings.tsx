import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { DocsContext } from '@/context/DocsContext'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import DeleteForm from '@/components/common/DeleteForm'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [schedulingForDeletion, setSchedulingForDeletion] = useState('')
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)

    const deleteScheduling = (id: string) => {
        const remainingSchedulings = schedulings.filter(scheduling => {
            return scheduling._id !== id
        })
        setSchedulings(remainingSchedulings)
        setDeleteSchedulingForm(false)
    }

    return (
        <Container>
            {
                schedulings[0]
                    ? <SchedulingsList setSchedulingForDeletion={setSchedulingForDeletion} setDeleteSchedulingForm={setDeleteSchedulingForm} />
                    : <AnyItemWarning />
            }
            {
                addSchedulingForm
                    ? <AddSchedulingForm setAddSchedulingForm={setAddSchedulingForm} />
                    : <AddItemButton setForm={setAddSchedulingForm} bgColor='darkblue' />
            }
            {
                deleteSchedulingForm
                    ? <DeleteForm targetName={schedulingForDeletion} deleteFunction={deleteScheduling} setFormOff={setDeleteSchedulingForm} />
                    : null
            }
        </Container>
    )

}