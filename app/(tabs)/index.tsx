import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import RevenueTitle from '@/components/info/RevenueTitle'
import RevenueChart from '@/components/info/RevenueChart'

export default function Info() {

    const [schedulings] = useContext(DocsContext).schedulings

    return (
        <Container>
            <RevenueTitle />
            {schedulings[0] && (
                <RevenueChart />
            )}
        </Container>
    )

}