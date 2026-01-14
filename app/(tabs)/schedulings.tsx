// native functions
import { useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

// custom functions
import { filterSchedulings } from '@/functions/common'

// context
import { DocsContext, } from '@/context/DocsContext'
import { MainDisplaysContext } from '@/context/MainDisplays'

// common components
import Container from '@/components/common/Container'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'
import LoadingScreen from '@/components/common/LoadingScreen'

// scheduling components
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import SchedulingsList from '@/components/schedulings/SchedulingsList'
import AddSchedulingButton from '@/components/schedulings/AddSchedulingButton'
import DeleteSchedulingForm from '@/components/schedulings/AboutSchedulingCard'

import { Entry } from '@/types'
import useDeleteEntry from '@/hooks/useDeleteEntry'

export default function Schedulings() {

    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [schedulingForDeletion, setSchedulingForDeletion] = useState({} as Entry)
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage

    const deleteEntry = useDeleteEntry().deleteEntry

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    const deleteScheduling = async (scheduling: Entry) => {

        setLoadingScreen(true)

        await deleteEntry(scheduling)

        setDeleteSchedulingForm(false)
        setLoadingScreen(false)
        setHideTabBar(false)

    }

    useEffect(() => {
        if (currentPage !== 'schedulings') {
            setAddSchedulingForm(false)
            setDeleteSchedulingForm(false)
        }
    }, [currentPage])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setAddSchedulingForm(false)
            return null
        })
    }, [])

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    filterSchedulings(schedulings, selectedMonth, currentYear)[0]
                        ? <SchedulingsList
                            filteredSchedulings={filterSchedulings(schedulings, selectedMonth, currentYear)}
                            setSchedulingForDeletion={setSchedulingForDeletion}
                            setDeleteSchedulingForm={setDeleteSchedulingForm}
                        />
                        : <AnyInfoWarning
                            text='listamos todas as suas receitas financeiras do mês.'
                            titleBgColor='#006600'
                            textBgColor='rgba(0, 102, 0, 0.1)'
                        />
                }
                <AddSchedulingButton
                    setAddSchedulingForm={setAddSchedulingForm}
                />
                {
                    addSchedulingForm
                    && <AddSchedulingForm
                        setAddSchedulingForm={setAddSchedulingForm}
                    />
                }
                {
                    deleteSchedulingForm
                        ? <DeleteSchedulingForm
                            scheduling={schedulingForDeletion}
                            deleteFunction={deleteScheduling}
                            setFormOff={setDeleteSchedulingForm}
                        />
                        : null
                }
            </Container>
        </>
    )

}