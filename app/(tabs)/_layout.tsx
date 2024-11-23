import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { ContentContext } from '@/context/InfoContent'

export default function TabLayout() {

    const [hideHeader] = useContext(MainDisplaysContext).header
    const [hideTabBar] = useContext(MainDisplaysContext).tabBar
    const [, setAddItemsForm] = useContext(ContentContext).form
    const [, setGeneralButton] = useContext(ContentContext).button

    return (
        <Tabs
            screenOptions={{
                headerShown: hideHeader,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                tabBarInactiveTintColor: 'gray',
                tabBarInactiveBackgroundColor: 'white',
                tabBarActiveBackgroundColor: 'white',
                tabBarStyle: {
                    display: hideTabBar ? 'none' : 'flex',
                    borderTopWidth: 0
                }
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Informações',
                    tabBarActiveTintColor: '#08819B',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='chart-simple' size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen name='schedulings'
                listeners={() => ({
                    tabPress: () => {
                        setAddItemsForm(false)
                        setGeneralButton(true)
                    },
                })}
                options={{
                    title: 'Entradas',
                    tabBarActiveTintColor: '#006600',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='arrow-trend-up' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                listeners={() => ({
                    tabPress: () => {
                        setAddItemsForm(false)
                        setGeneralButton(true)
                    },
                })}
                options={{
                    title: 'Saídas',
                    tabBarActiveTintColor: '#660000',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='arrow-trend-down' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='services'
                listeners={() => ({
                    tabPress: () => {
                        setAddItemsForm(false)
                        setGeneralButton(true)
                    },
                })}
                options={{
                    title: 'Itens',
                    tabBarActiveTintColor: '#330066',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}