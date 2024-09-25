import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import RevenueTitle from '@/components/info/RevenueTitle'
import RevenueChart from '@/components/info/RevenueChart'
import { StyleSheet, Text, View } from 'react-native'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import RevenueList from '@/components/info/RevenueList'

export default function Info() {

    const [schedulings] = useContext(DocsContext).schedulings

    return (
        <Container>
            {
                schedulings[0]
                    ? <View>
                        <RevenueTitle />
                        <RevenueChart />
                        <RevenueList />
                    </View>
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
        </Container>
    )

}