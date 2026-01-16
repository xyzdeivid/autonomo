import { Tabs } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { ContentContext } from '@/context/InfoContent'
import { Keyboard } from 'react-native'
import { DocsContext } from '@/context/DocsContext'
import { colors } from '@/constants/appColors'

export default function TabLayout() {

    const [hideHeader] = useContext(MainDisplaysContext).header
    const [hideTabBar, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [, setAddItemsForm] = useContext(ContentContext).form
    const [, setGeneralButton] = useContext(ContentContext).button
    const [, setCurrentPage] = useContext(DocsContext).currentPage

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () =>
            setHideTabBar(true)
        )
        Keyboard.addListener('keyboardDidHide', () =>
            setHideTabBar(false)
        )
    }, [])

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
                listeners={() => ({
                    tabPress: () => {
                        setCurrentPage('index')
                    },
                })}
                options={{
                    title: 'Balanço',
                    tabBarActiveTintColor: colors.home.max,
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
                        setCurrentPage('schedulings')
                    },
                })}
                options={{
                    title: 'Receitas',
                    tabBarActiveTintColor: colors.entries.max,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='money-bill-trend-up' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                listeners={() => ({
                    tabPress: () => {
                        setAddItemsForm(false)
                        setGeneralButton(true)
                        setCurrentPage('expenses')
                    },
                })}
                options={{
                    title: 'Despesas',
                    tabBarActiveTintColor: colors.outflows.max,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='receipt' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='services'
                listeners={() => ({
                    tabPress: () => {
                        setAddItemsForm(false)
                        setGeneralButton(true)
                        setCurrentPage('services')
                    },
                })}
                options={{
                    title: 'Catálogo',
                    tabBarActiveTintColor: colors.items.max,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}