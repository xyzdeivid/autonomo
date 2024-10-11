import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
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
                    title: 'Entradas',
                    tabBarActiveBackgroundColor: 'darkgreen',
                    headerStyle: {
                        backgroundColor: 'darkgreen'
                    },
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="arrow-trend-up" size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                options={{
                    title: 'Saídas',
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
                    title: 'Items',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}