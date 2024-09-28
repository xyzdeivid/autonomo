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

    function generateColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const getMostOfferedServices = () => {
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
            return {
                service: current[0],
                amount: current[1],
                color: generateColor()
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