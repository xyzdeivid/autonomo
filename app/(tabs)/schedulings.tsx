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
import { colors } from '@/constants/appColors'

export default function Schedulings() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage
    
    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [selectedEntryForDeletion, setSelectedEntryForDeletion] = useState('')
    const entryForDeletion = entries.find(e => e._id === selectedEntryForDeletion)
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)

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
                    filterSchedulings(entries, selectedMonth, currentYear)[0]
                        ? <SchedulingsList
                            filteredSchedulings={filterSchedulings(entries, selectedMonth, currentYear)}
                            setSelectedEntryForDeletion={setSelectedEntryForDeletion}
                            setDeleteSchedulingForm={setDeleteSchedulingForm}
                        />
                        : <AnyInfoWarning
                            text='listamos todas as suas receitas financeiras do mês.'
                            titleBgColor={colors.entries.max}
                            textBgColor={colors.entries.min}
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
                    deleteSchedulingForm && entryForDeletion
                        ? <DeleteSchedulingForm
                            scheduling={entryForDeletion}
                            deleteFunction={deleteScheduling}
                            setFormOff={setDeleteSchedulingForm}
                        />
                        : null
                }
            </Container>
        </>
    )

}