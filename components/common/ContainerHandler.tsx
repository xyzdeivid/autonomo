import { Entry, Outflow, Item } from '@/context/DocsContext'
import React from 'react'
import { ScrollView, View } from 'react-native'

interface ContainerHandlerProps {
    filteredTargets: Entry[] | Outflow[] | Item[]
    children: React.ReactNode
}

export default function ContainerHandler({ filteredTargets, children }: ContainerHandlerProps) {

    if (filteredTargets.length > 10) {
        return (
            <>
                <ScrollView style={{ maxHeight: 540 }}>
                    {children}
                </ScrollView>
                <View
                    style={{
                        height: 2,
                        width: '80%',
                        marginHorizontal: 'auto',
                        backgroundColor: '#E0E0E0'
                    }}
                />
            </>
        )
    } else {
        return (
            <>
                <View>
                    {children}
                </View>
                <View
                    style={{
                        height: 2,
                        width: '80%',
                        marginHorizontal: 'auto',
                        backgroundColor: '#E0E0E0'
                    }}
                />
            </>
        )
    }
}