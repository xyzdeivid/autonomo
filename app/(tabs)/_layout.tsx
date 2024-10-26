import { Tabs } from 'expo-router'
import React, { useContext } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { ContentContext } from '@/context/InfoContent'
import { LinearGradient } from 'expo-linear-gradient'

export default function TabLayout() {

    const [hideHeader] = useContext(MainDisplaysContext).header
    const [hideTabBar] = useContext(MainDisplaysContext).tabBar
    const [, setAddItemsForm] = useContext(ContentContext).form
    const [, setGeneralButton] = useContext(ContentContext).button

    return (
        <Tabs
            screenOptions={{
                headerShown: hideHeader,
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: '#112935'
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
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#112935', '#08819B']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{ flex: 1 }}
                        />
                    ),
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
                        setAddItemsForm(false)
                        setGeneralButton(true)
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
                    title: 'Items',
                    tabBarActiveTintColor: '#330066',
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#112935', '#330066']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{ flex: 1 }}
                        />
                    ),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name='bag-shopping' size={24} color={color} />
                    )
                }} />
        </Tabs>
    )
}