// native functions
import { useContext, useEffect, useState } from 'react'

// custom functions
import { filterSchedulings } from '@/utils/common'

// context
import { DocsContext, } from '@/context/DocsContext'

// common components
import Container from '@/components/common/Container'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'
import LoadingScreen from '@/components/common/LoadingScreen'

// scheduling components
import AddSchedulingForm from '@/components/entries/AddEntryForm'
import SchedulingsList from '@/components/entries/EntriesList'
import DeleteSchedulingForm from '@/components/entries/AboutEntryCard'

import { Entry } from '@/types'
import useDeleteEntry from '@/hooks/entries/useDeleteEntry'
import { colors } from '@/styles/appColors'
import AddItemButton from '@/components/common/AddItemButton'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { NoItemAvailableCard } from '@/components/common/NoItemAvailableCard'
import { useShowAddEntryForm } from '@/hooks/common/useShowAddEntryForm'

export default function Schedulings() {

    const theme = useGetTheme()

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage

    const [showAddEntry, setShowAddEntry] = useState(false)
    const [selectedEntryForDeletion, setSelectedEntryForDeletion] = useState('')
    const entryForDeletion = entries.find(e => e._id === selectedEntryForDeletion)
    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [showNoItemAvailableCard, setShowNoItemAvailableCard] = useState(false)

    const deleteEntry = useDeleteEntry().deleteEntry


    const deleteScheduling = async (scheduling: Entry) => {

        setLoadingScreen(true)

        await deleteEntry(scheduling)

        setDeleteSchedulingForm(false)
        setLoadingScreen(false)

    }

    useEffect(() => {
        if (currentPage !== 'schedulings') {
            setShowAddEntry(false)
            setDeleteSchedulingForm(false)
        }
    }, [currentPage])

    const showAddEntryForm = useShowAddEntryForm().showAddEntryForm

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            {showNoItemAvailableCard && <NoItemAvailableCard setShowFirstTimeCard={setShowNoItemAvailableCard} />}
            <Container>
                {
                    filterSchedulings(entries, selectedMonth, currentYear)[0]
                        ? <>
                            <SchedulingsList
                                setSelectedEntryForDeletion={setSelectedEntryForDeletion}
                                setDeleteSchedulingForm={setDeleteSchedulingForm}
                            />
                            <AddItemButton
                                iconColor={'#FFF'}
                                bgColor={colors.entries.max}
                                onPress={() => showAddEntryForm(setShowAddEntry, setShowNoItemAvailableCard)}
                            />
                        </>
                        : <AnyInfoWarning
                            text='listamos todas as suas receitas financeiras do mês.'
                            titleBgColor={colors.entries.max}
                            textBgColor={theme === 'dark' ? colors.entries.mid : colors.entries.min}
                            addDataButtonText='Adicionar Receita'
                            onAddDataButtonPress={() => showAddEntryForm(setShowAddEntry, setShowNoItemAvailableCard)}
                        />
                }
                {
                    showAddEntry
                    && <AddSchedulingForm
                        setAddSchedulingForm={setShowAddEntry}
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