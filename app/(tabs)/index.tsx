import { useContext, useEffect, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import { View } from 'react-native'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterSchedulings } from '@/functions/common'
import Title from '@/components/info/Title'
import Revenue from '@/components/info/Revenue'
import ContentForm from '@/components/info/ContentForm'
import Services from '@/components/info/Services'
import Products from '@/components/info/Products'
import Budgets from '@/components/info/Budgets'
import { ContentContext } from '@/context/InfoContent'
import GeneralButton from '@/components/info/GeneralButton'
import AddItemForm from '@/components/info/AddItemForm'
import AddServiceForm from '@/components/services/AddServiceForm'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import { getServices } from '@/functions/schedulings'

export default function Info() {

    const [content, setContent] = useContext(ContentContext).content
    const [contentForm, setContentForm] = useState(false)
    const [schedulings] = useContext(DocsContext).schedulings
    const [services] = useContext(DocsContext).services
    const [selectedMonth] = useContext(MonthContext)
    const [addItemsForm, setAddItemsForm] = useContext(ContentContext).form
    const [generalButton, setGeneralButton] = useContext(ContentContext).button
    const [addServiceForm, setAddServiceForm] = useState(false)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [addSchedulingForm, setAddSchedulingForm] = useState(false)

    const servicesSchedulings = () => {
        return schedulings.filter(scheduling => {
            return scheduling.service.category === 'service'
        })
    }

    const productsSchedulings = () => {
        return schedulings.filter(scheduling => {
            return scheduling.service.category === 'product'
        })
    }

    const budgetsSchedulings = () => {
        return schedulings.filter(scheduling => {
            return scheduling.service.category === 'budget'
        })
    }

    const selectPage = () => {
        switch (content) {
            case 'financial':
                return (
                    <Revenue />
                )
            case 'products':
                return (
                    <Products
                        schedulings={productsSchedulings()}
                    />
                )
            case 'services':
                return (
                    <Services
                        schedulings={servicesSchedulings()}
                    />
                )
            case 'budgets':
                return (
                    <Budgets
                        schedulings={budgetsSchedulings()}
                    />
                )
        }
    }

    return (
        <Container>
            {
                schedulings[0] && (<MonthInput />)
            }
            {
                contentForm && (
                    <ContentForm
                        setContent={setContent}
                        setContentForm={setContentForm}
                    />
                )
            }
            {
                filterSchedulings(schedulings, selectedMonth)[0]
                    ? <View>
                        <Title content={content} setContentForm={setContentForm} />
                        {selectPage()}
                    </View>
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
            {
                generalButton
                && <GeneralButton
                    setAddItemsForm={setAddItemsForm}
                    setGeneralButton={setGeneralButton}
                />
            }
            {
                addItemsForm
                && <AddItemForm
                    setGeneralButton={setGeneralButton}
                    setAddItemsForm={setAddItemsForm}
                    setAddServiceForm={setAddServiceForm}
                    setAddExpenseForm={setAddExpenseForm}
                    setAddSchedulingForm={setAddSchedulingForm}
                    services={services}
                />
            }
            {
                addServiceForm
                && <AddServiceForm
                    setAddServiceForm={setAddServiceForm}
                    setButton={setGeneralButton}
                />
            }
            {
                addExpenseForm
                && <AddExpenseForm
                    setAddExpenseForm={setAddExpenseForm}
                    setButton={setGeneralButton}
                />
            }
            {
                addSchedulingForm
                && <AddSchedulingForm
                    setAddSchedulingForm={setAddSchedulingForm}
                    services={getServices(services)}
                    setButton={setGeneralButton}
                />
            }
        </Container>
    )

}