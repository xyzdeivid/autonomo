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

export default function Info() {

    const [content, setContent] = useState('financial')
    const [contentForm, setContentForm] = useState(false)
    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)

    const selectPage = () => {
        switch (content) {
            case 'financial':
                return <Revenue />
            case 'services':
                return <Services />
        }
    }

    return (
        <Container>
            {
                schedulings[0] && (
                    <View>
                        <MonthInput />
                        <Title
                            content={content}
                            setContentForm={setContentForm}
                        />
                    </View>
                )
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
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
        </Container>
    )

}