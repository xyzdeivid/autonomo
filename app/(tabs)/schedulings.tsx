import { useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)

    return (
        <Container>
            <AnyItemWarning />
            {
                addSchedulingForm
                ? <AddSchedulingForm setAddSchedulingForm={setAddSchedulingForm} />
                : <AddItemButton setForm={setAddSchedulingForm} bgColor='darkblue' />
            }
        </Container>
    )

}