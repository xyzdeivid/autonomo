import { Text, View } from 'react-native'
import { useContext } from 'react'
import { DocsContext } from '@/context/DocsContext'

export default function ServicesList() {

    const [services] = useContext(DocsContext).services

    return (
        <View>
            {services.map(service => (
                <Text key={service._id}>Nome: {service._id}, valor: {service.value}</Text>
            ))}
        </View>
    )

}