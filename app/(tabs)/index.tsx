// native functions
import { useContext, useState } from 'react'

// context
import { DocsContext } from '@/context/DocsContext'

// common components
import Container from '@/components/common/Container'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

import { colors } from '@/styles/appColors'
import { Alert, Text, View } from 'react-native'
import AddItemButton from '@/components/common/AddItemButton'
import { EntryOrOutflowOptions } from '@/components/index/EntryOrOutflowOptions'
import AddEntryForm from '@/components/entries/AddEntryForm'
import AddOutflowForm from '@/components/outflows/AddOutflowForm'
import { Insight } from '@/components/index/Insight'
import { getServices } from '@/utils/schedulings'
import { Item } from '@/types'
import { YearButton } from '@/components/index/YearButton'
import { useShowAnyInfoWarning } from '@/hooks/index/useShowAnyInfoWarning'

export default function Info() {

    const appDocs = useContext(DocsContext)
    const [items] = appDocs.items

    const [showEntryOrOutflowOptions, setShowEntryOrOutflowOptions] = useState(false)
    const [showAddEntryForm, setShowAddEntryForm] = useState(false)
    const [showAddOutflowForm, setShowAddOutflowForm] = useState(false)

    const docsLoaded = appDocs.docsLoaded

    function areThereAnyItemsAvailable(items: Item[]): boolean {
        if (getServices(items)[0]) return true
        return false
    }

    const showAnyInfoWarning = useShowAnyInfoWarning()


    return (
        <Container>
            {!docsLoaded && (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 64 }}>. . .</Text>
                </View>
            )}
            {
                showAnyInfoWarning
                    ?
                    <AnyInfoWarning
                        text='te informamos sobre seu balanço financeiro mensal. Mas para isso, você precisar registras suas receitas e despesas.'
                        titleBgColor={colors.home.max}
                        textBgColor={colors.home.min}
                    /> :
                    <>
                        <Insight
                        />
                        <AddItemButton
                            iconColor={'#FFF'}
                            bgColor={colors.home.midMax}
                            borderColor={colors.home.midMin}
                            onPress={() => setShowEntryOrOutflowOptions(true)}
                        />
                    </>
            }
            <YearButton />
            {
                showEntryOrOutflowOptions && (
                    <EntryOrOutflowOptions
                        setShowEntryOrOutflowOptions={setShowEntryOrOutflowOptions}
                        setShowAddEntryForm={() => {
                            const anyItemsAvailable = areThereAnyItemsAvailable(items)
                            if (anyItemsAvailable) {
                                setShowAddEntryForm(true)
                            } else {
                                Alert.alert('Erro', 'Não há nenhum produto ou serviço disponível.')
                            }
                        }}
                        setShowAddOutflowForm={() => setShowAddOutflowForm(true)}
                    />
                )
            }
            {
                showAddEntryForm && (
                    <AddEntryForm setAddSchedulingForm={setShowAddEntryForm} />
                )
            }
            {
                showAddOutflowForm && (
                    <AddOutflowForm setAddExpenseForm={setShowAddOutflowForm} />
                )
            }
        </Container>
    )

}