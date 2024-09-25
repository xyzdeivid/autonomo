import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { PieChart } from 'react-native-gifted-charts'

export default function MostOfferedServicesChart() {

    const [schedulings] = useContext(DocsContext).schedulings

    const getMostOfferedServices = () => {
        const initialData = []
        const servicesArrays = schedulings.map(scheduling => {
            return scheduling.service._id
        }).flat()
        const services: [string, number][] = Array.from(new Set(servicesArrays))
            .map(service => [service, 0])
        servicesArrays.forEach(current => {
            for (const service of services) {
                if (current === service[0]) {
                    service[1] += 1
                }
            }
        })
        for (const service of services) {
            initialData.push({ text: service[0], value: service[1] })
        }
        return initialData
    }

    return <PieChart showText textColor='white' data={getMostOfferedServices()} />
}