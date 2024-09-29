import { Scheduling } from '@/context/DocsContext'
import { ScrollView, View } from 'react-native'

interface ContainerHandlerProps {
    filteredSchedulings: Scheduling[]
    children: React.ReactNode
}

export default function ContainerHandler({ filteredSchedulings, children }: ContainerHandlerProps) {

    if (filteredSchedulings.length > 8) {
        return (
            <ScrollView style={{ marginBottom: 14, maxHeight: 450 }}>
                {children}
            </ScrollView>
        )
    } else {
        return (
            <View style={{ marginBottom: 14 }}>
                {children}
            </View>
        )
    }
}