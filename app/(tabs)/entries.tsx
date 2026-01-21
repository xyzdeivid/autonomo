// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler } from 'react-native'

// custom functions
import { filterSchedulings } from '@/utils/common'

// context
import { DocsContext, } from '@/context/DocsContext'
import { MainDisplaysContext } from '@/context/MainDisplays'

// common components
import Container from '@/components/common/Container'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'
import LoadingScreen from '@/components/common/LoadingScreen'

// scheduling components
import AddSchedulingForm from '@/components/entries/AddEntryForm'
import SchedulingsList from '@/components/entries/EntriesList'
import DeleteSchedulingForm from '@/components/entries/AboutEntryCard'

import { Entry } from '@/types'
import useDeleteEntry from '@/hooks/useDeleteEntry'
import { colors } from '@/constants/appColors'
import { getServices } from '@/utils/schedulings'
import AddItemButton from '@/components/common/AddItemButton'

export default function Schedulings() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [items] = appDocs.items
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

    const checkServices = () => {
        if (getServices(items)[0]) {
            setAddSchedulingForm(true)
        } else {
            Alert.alert('Sem produto ou serviço disponível', 'Verifique se você tem algum produto ou serviço registrado. Caso tenha produto, verifique se tem estoque disponível.')
        }
    }

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
                <AddItemButton
                    iconColor={colors.entries.max}
                    bgColor={colors.entries.min}
                    borderColor={colors.entries.midMin}
                    onPress={() => checkServices()}
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