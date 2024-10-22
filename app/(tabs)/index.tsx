import { useContext, useState } from 'react'
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
import { ContentContext } from '@/context/Content'
import GeneralButton from '@/components/info/GeneralButton'
import AddItemForm from '@/components/info/AddItemForm'

export default function Info() {

    const [content, setContent] = useContext(ContentContext)
    const [contentForm, setContentForm] = useState(false)
    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)
    const [addItemsForm, setAddItemsForm] = useState(false)

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
                addItemsForm
                ? <AddItemForm setAddItemsForm={setAddItemsForm} />
                : <GeneralButton setAddItemsForm={setAddItemsForm} />
            }
        </Container>
    )

}