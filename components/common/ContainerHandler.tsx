import { Scheduling, Expense } from '@/context/DocsContext'
import { ScrollView, View } from 'react-native'

interface ContainerHandlerProps {
    filteredTargets: Scheduling[] | Expense[]
    children: React.ReactNode
}

export default function ContainerHandler({ filteredTargets, children }: ContainerHandlerProps) {

    if (filteredTargets.length > 8) {
        return (
            <ScrollView style={{ maxHeight: 450 }}>
                {children}
            </ScrollView>
        )
    } else {
        return (
            <View>
                {children}
            </View>
        )
    }
}