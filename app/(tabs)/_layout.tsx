import { Tabs } from 'expo-router'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Informações',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='chart-simple' size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen name='schedulings'
                options={{
                    title: 'Agendamentos',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='calendar-plus' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                options={{
                    title: 'Despesas',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='arrow-trend-down' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='services'
                options={{
                    title: 'Serviços',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}