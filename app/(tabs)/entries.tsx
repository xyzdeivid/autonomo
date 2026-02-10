// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

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

import { Entry, Item } from '@/types'
import useDeleteEntry from '@/hooks/entries/useDeleteEntry'
import { colors } from '@/styles/appColors'
import AddItemButton from '@/components/common/AddItemButton'
import { getServices } from '@/utils/schedulings'
import { useGetTheme } from '@/hooks/common/useGetTheme'

export default function Schedulings() {

    const theme = useGetTheme()

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


    const deleteScheduling = async (scheduling: Entry) => {

        setLoadingScreen(true)

        await deleteEntry(scheduling)

        setDeleteSchedulingForm(false)
        setLoadingScreen(false)

    }

    useEffect(() => {
        if (currentPage !== 'schedulings') {
            setAddSchedulingForm(false)
            setDeleteSchedulingForm(false)
        }
    }, [currentPage])

    function areThereAnyItemsAvailable(items: Item[]): boolean {
        if (getServices(items)[0]) return true
        return false
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
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
                                onPress={() => {
                                    const itemsAvailable = areThereAnyItemsAvailable(items)
                                    if (itemsAvailable) {
                                        setAddSchedulingForm(true)
                                    } else {
                                        Alert.alert('Erro', 'Não há nenhum produto ou serviço disponível.')
                                    }
                                }}
                            />
                        </>
                        : <AnyInfoWarning
                            text='listamos todas as suas receitas financeiras do mês.'
                            titleBgColor={colors.entries.max}
                            textBgColor={theme === 'dark' ? colors.entries.mid : colors.entries.min}
                            addDataButtonText='Adicionar Receita'
                            onAddDataButtonPress={() => {
                                const itemsAvailable = areThereAnyItemsAvailable(items)
                                if (itemsAvailable) {
                                    setAddSchedulingForm(true)
                                } else {
                                    Alert.alert('Erro', 'Não há nenhum produto ou serviço disponível.')
                                }
                            }}
                        />
                }
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