// native functions
import { useContext, useState } from 'react'

// context
import { DocsContext } from '@/context/DocsContext'

// common components
import Container from '@/components/common/Container'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

import { colors } from '@/styles/appColors'
import AddItemButton from '@/components/common/AddItemButton'
import { EntryOrOutflowOptions } from '@/components/index/EntryOrOutflowOptions'
import AddEntryForm from '@/components/entries/AddEntryForm'
import AddOutflowForm from '@/components/outflows/AddOutflowForm'
import { Insight } from '@/components/index/Insight'
import { SettingsButton } from '@/components/index/SettingsButton'
import { useShowAnyInfoWarning } from '@/hooks/index/useShowAnyInfoWarning'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { FirstTimeCard } from '@/components/index/FirstTimeCard'
import { NoItemAvailableCard } from '@/components/common/NoItemAvailableCard'
import { useShowAddEntryForm } from '@/hooks/common/useShowAddEntryForm'

export default function Info() {

    const theme = useGetTheme()

    const appDocs = useContext(DocsContext)

    const [showEntryOrOutflowOptions, setShowEntryOrOutflowOptions] = useState(false)
    const [showAddEntry, setShowAddEntry] = useState(false)
    const [showAddOutflowForm, setShowAddOutflowForm] = useState(false)
    const [showNoItemAvailableCard, setShowNoItemAvailableCard] = useState(false)

    const [firstTime] = appDocs.firstTime

    const showAnyInfoWarning = useShowAnyInfoWarning()
    const showAddEntryForm = useShowAddEntryForm().showAddEntryForm

    return (
        <>
            {firstTime && <FirstTimeCard />}
            {showNoItemAvailableCard && <NoItemAvailableCard setShowFirstTimeCard={setShowNoItemAvailableCard} />}
            <Container>
                {
                    showAnyInfoWarning
                        ?
                        <AnyInfoWarning
                            text='informamos sobre seu balanço financeiro mensal. Porém, para isso, você precisa registrar suas receitas e despesas.'
                            titleBgColor={colors.home.max}
                            textBgColor={theme === 'dark' ? colors.home.mid : colors.home.min}
                        /> :
                        <>
                            <Insight
                            />
                            <AddItemButton
                                iconColor={'#FFF'}
                                bgColor={colors.home.max}
                                onPress={() => setShowEntryOrOutflowOptions(true)}
                            />
                        </>
                }
                <SettingsButton />
                {
                    showEntryOrOutflowOptions && (
                        <EntryOrOutflowOptions
                            setShowEntryOrOutflowOptions={setShowEntryOrOutflowOptions}
                            setShowAddEntryForm={() => showAddEntryForm(setShowAddEntry, setShowNoItemAvailableCard)}
                            setShowAddOutflowForm={() => setShowAddOutflowForm(true)}
                        />
                    )
                }
                {
                    showAddEntry && (
                        <AddEntryForm setAddSchedulingForm={setShowAddEntry} />
                    )
                }
                {
                    showAddOutflowForm && (
                        <AddOutflowForm setAddExpenseForm={setShowAddOutflowForm} />
                    )
                }
            </Container>
        </>
    )

}