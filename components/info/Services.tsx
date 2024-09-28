import { Text, View } from 'react-native'
import ServicesChart from './ServicesChart'
import { useContext, useEffect, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'
import { filterSchedulings } from '@/functions/common'
import { MonthContext } from '@/context/Month'
import ServicesList from './ServicesList'

type ServicesProps = {
    service: string
    amount: number
    color: string
}[]

export default function Services() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [selectedMonth] = useContext(MonthContext)
    const [services, setServices] = useState<ServicesProps>([] as ServicesProps)

    useEffect(() => {
        setServices(getMostOfferedServices())
    }, [schedulings])

    const colors = [
        '#0000FF',
        '#008000',
        '#1E90FF',
        '#32CD32',
        '#00BFFF',
        '#3CB371',
        '#4682B4',
        '#66CDAA',
        '#ADD8E6',
        '#98FB98'
    ]

    const getMostOfferedServices = () => {
        let colorIndex = 0
        const servicesArrays = filterSchedulings(schedulings, selectedMonth).map(scheduling => {
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
        const chartFormat = services.map(current => {
            colorIndex ++
            return {
                service: current[0],
                amount: current[1],
                color: colors[colorIndex]
            }
        })
        return chartFormat
    }


    return (
        <View style={{ zIndex: -1 }}>
            <ServicesChart services={services} />
            <View style={{
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1,
                marginHorizontal: 10,
                marginBottom: 20
            }}
            />
            <ServicesList services={services} />
        </View>
    )

}