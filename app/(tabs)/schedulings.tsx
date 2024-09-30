import { useContext, useState } from 'react'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import Container from '@/components/common/Container'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { DocsContext } from '@/context/DocsContext'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import DeleteForm from '@/components/common/DeleteForm'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterSchedulings } from '@/functions/common'
import AddSchedulingButton from '@/components/schedulings/AddSchedulingButton'

import { orderSchedulings } from '@/functions/schedulings'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)
    const [schedulingForDeletion, setSchedulingForDeletion] = useState('')
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)

    const deleteScheduling = async (id: string) => {

        const remainingSchedulings = schedulings.filter(scheduling => {
            return scheduling._id !== id
        })

        try {

            await AsyncStorage.setItem('schedulings', JSON.stringify(remainingSchedulings))

            setSchedulings(orderSchedulings(remainingSchedulings))

            setDeleteSchedulingForm(false)

        } catch (error) {

        }

    }

    return (
        <Container>
            {
                schedulings[0] && (
                    <MonthInput />
                )
            }
            {
                filterSchedulings(schedulings, selectedMonth)[0]
                    ? <SchedulingsList
                        filteredSchedulings={filterSchedulings(schedulings, selectedMonth)}
                        setSchedulingForDeletion={setSchedulingForDeletion}
                        setDeleteSchedulingForm={setDeleteSchedulingForm}
                    />
                    : <AnyItemWarning text='Nenhum agendamento cadastrado' />
            }
            {
                addSchedulingForm
                    ? <AddSchedulingForm setAddSchedulingForm={setAddSchedulingForm} />
                    : <AddSchedulingButton setAddSchedulingForm={setAddSchedulingForm} />
            }
            {
                deleteSchedulingForm
                    ? <DeleteForm targetName={schedulingForDeletion} deleteFunction={deleteScheduling} setFormOff={setDeleteSchedulingForm} />
                    : null
            }
        </Container>
    )

}