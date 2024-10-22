import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { HideTabBarContext } from '@/context/HideTabBar'
import headerIcon from '@/assets/images/header-icon.png'
import { Image } from 'react-native'
import { ContentContext } from '@/context/Content'

export default function TabLayout() {

    const [hideTabBar] = useContext(HideTabBarContext)
    const [, setContent] = useContext(ContentContext)

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: '#112935'
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarInactiveBackgroundColor: 'white',
                tabBarActiveBackgroundColor: '#112935',
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
                listeners={() => ({
                    tabPress: () => {
                        setContent('financial')
                    },
                })}
                options={{
                    title: 'Entradas',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="arrow-trend-up" size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                listeners={() => ({
                    tabPress: () => {
                        setContent('financial')
                    },
                })}
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
                listeners={() => ({
                    tabPress: () => {
                        setContent('financial')
                    },
                })}
                options={{
                    title: 'Items',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}