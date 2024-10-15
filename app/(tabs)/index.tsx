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

export default function Info() {

    const [content, setContent] = useState('financial')
    const [contentForm, setContentForm] = useState(false)
    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)

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
            case 'services':
                return (
                    <Services schedulings={servicesSchedulings()} />
                )
            case 'products':
                return (
                    <Products schedulings={productsSchedulings()} />
                )
                case 'budgets':
                return (
                    <Budgets schedulings={budgetsSchedulings()} />
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
                        <View style={{
                            width: '95%',
                            height: 1,
                            backgroundColor: 'lightgray',
                            marginHorizontal: 'auto',
                            marginVertical: 26
                        }} />
                        {selectPage()}
                    </View>
                    : <AnyItemWarning text='Nenhuma venda ou agendamento cadastrado' />
            }
        </Container>
    )

}