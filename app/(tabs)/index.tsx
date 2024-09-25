import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import RevenueTitle from '@/components/info/RevenueTitle'
import RevenueChart from '@/components/info/RevenueChart'
import { ScrollView, View } from 'react-native'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import RevenueList from '@/components/info/RevenueList'
import MonthInput from '@/components/common/MonthInput'
import MostOfferedServicesChart from '@/components/info/MostOfferedServicesChart'
import MostOfferedServicesTitle from '@/components/info/MostOfferedServicesTitle'

export default function Info() {

    const [schedulings] = useContext(DocsContext).schedulings

    const Revenue = () => (
        <View>
            <RevenueTitle />
            <RevenueChart />
            <RevenueList />
        </View>
    )

    const Services = () => (
        <View>
            <MostOfferedServicesTitle />
            <MostOfferedServicesChart />
        </View>
    )

    return (
        <Container>
            <ScrollView>
            {
                schedulings[0]
                    ? <View>
                        <MonthInput />
                        <Revenue />
                        <Services />
                    </View>
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
            </ScrollView>
        </Container>
    )

}