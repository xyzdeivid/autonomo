import { useContext, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import { View, Text } from 'react-native'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterSchedulings } from '@/functions/common'
import Title from '@/components/info/Title'
import Revenue from '@/components/info/Revenue'
import ContentForm from '@/components/info/ContentForm'
import Services from '@/components/info/Services'
import Products from '@/components/info/Products'

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

    const selectPage = () => {
        switch (content) {
            case 'financial':
                return (
                    <View>
                        <Title content={content} setContentForm={setContentForm} />
                        <Revenue />
                    </View>
            )
            case 'services':
                return (
                    <View>
                        <Title content={content} setContentForm={setContentForm} />
                        <Services schedulings={servicesSchedulings()} />
                    </View>
                )
            case 'products':
                return (
                    <View>
                        <Title content={content} setContentForm={setContentForm} />
                        <Products schedulings={productsSchedulings()} />
                    </View>
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
                    ? selectPage()
                    : <AnyItemWarning text='Nenhuma venda ou agendamento cadastrado' />
            }
        </Container>
    )

}