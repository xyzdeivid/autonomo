import React from 'react'
import { ScrollView } from 'react-native'

interface ContainerHandlerProps {
    children: React.ReactNode
}

export default function ContainerHandler({ children }: ContainerHandlerProps) {

        return (
                <ScrollView style={{ maxHeight: 450 }}>
                    {children}
                </ScrollView>
        )
}