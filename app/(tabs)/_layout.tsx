import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { HideTabBarContext } from '@/context/HideTabBar'

export default function TabLayout() {

    const [hideTabBar] = useContext(HideTabBarContext)

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: '#004AAD'
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarInactiveBackgroundColor: 'white',
                tabBarActiveBackgroundColor: '#004AAD',
                tabBarStyle: {
                    display: hideTabBar ? 'none' : 'flex',
                    borderTopWidth: 0
                }
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
                    title: 'Agendamentos / Vendas',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='calendar-plus' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                options={{
                    title: 'Despesas',
                    tabBarActiveBackgroundColor: 'darkred',
                    headerStyle: {
                        backgroundColor: 'darkred'
                    },
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='arrow-trend-down' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='services'
                options={{
                    title: 'Serviços / Produtos',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}