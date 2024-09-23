import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { DocsContext } from '@/context/DocsContext'
import SchedulingsList from '@/components/schedulings/SchedulingsList'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulings] = useContext(DocsContext).schedulings

    return (
        <Container>
            {
                schedulings[0]
                ? <SchedulingsList />
                : <AnyItemWarning />
            }
            {
                addSchedulingForm
                ? <AddSchedulingForm setAddSchedulingForm={setAddSchedulingForm} />
                : <AddItemButton setForm={setAddSchedulingForm} bgColor='darkblue' />
            }
        </Container>
    )

}