import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { HideTabBarContext } from '@/context/HideTabBar'
import { ContentContext } from '@/context/InfoContent'
import { LinearGradient } from 'expo-linear-gradient'

export default function TabLayout() {

    const [hideTabBar] = useContext(HideTabBarContext)
    const [, setContent] = useContext(ContentContext).content
    const [, setAddItemsForm] = useContext(ContentContext).form

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: '#112935'
                },
                tabBarActiveTintColor: '#112935',
                tabBarInactiveTintColor: 'white',
                tabBarInactiveBackgroundColor: '#112935',
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
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='chart-simple' size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen name='schedulings'
                listeners={() => ({
                    tabPress: () => {
                        setContent('financial')
                        setAddItemsForm(false)
                    },
                })}
                options={{
                    title: 'Entradas',
                    tabBarActiveTintColor: '#006600',
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#112935', '#006600']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{ flex: 1 }}
                        />
                    ),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='arrow-trend-up' size={24} color={color} />
                    )
                }} />
            <Tabs.Screen name='expenses'
                listeners={() => ({
                    tabPress: () => {
                        setContent('financial')
                        setAddItemsForm(false)
                    },
                })}
                options={{
                    title: 'Saídas',
                    tabBarActiveTintColor: '#660000',
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#112935', '#660000']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{ flex: 1 }}
                        />
                    ),
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
                        setAddItemsForm(false)
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