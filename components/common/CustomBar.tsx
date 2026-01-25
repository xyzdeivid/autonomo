import { Tabs } from 'expo-router'
import { Pressable, View, Text, Animated, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/styles/appColors'
import { useEffect, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TabButtonProps = {
    label: string
    icon: React.ComponentProps<typeof Ionicons>['name']
    activeColor: string
    focused: boolean
    onPress: () => void
}

function TabButton({
    label,
    icon,
    activeColor,
    focused,
    onPress,
}: TabButtonProps) {
    const scale = useRef(new Animated.Value(1)).current
    const bgAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.spring(scale, {
            toValue: focused ? 1.15 : 1,
            useNativeDriver: true,
            friction: 5,
        }).start()

        Animated.timing(bgAnim, {
            toValue: focused ? 1 : 0,
            duration: 220,
            useNativeDriver: true,
        }).start()
    }, [focused, scale, bgAnim])

    const backgroundColor = bgAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', activeColor],
    })

    return (
        <Pressable
            onPress={onPress}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
            }}
        >
            <Animated.View
                style={{
                    padding: 4,
                    borderRadius: 8,
                    backgroundColor,
                    transform: [{ scale }],
                }}
            >
                <Ionicons
                    name={icon}
                    size={24}
                    color={focused ? '#fff' : '#8a8c8f'}
                />
            </Animated.View>
            <Text
                style={{
                    fontSize: 12,
                    color: '#8A8C8F',
                    fontWeight: '600',
                }}
            >
                {label}
            </Text>
        </Pressable>
    )
}


type Props = Parameters<
    NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>
>[0]

const TAB_CONFIG = {
    index: {
        label: 'Início',
        icon: 'stats-chart',
        color: colors.home.max,
    },
    items: {
        label: 'Catálogo',
        icon: 'pricetags',
        color: colors.items.max,
    },
    entries: {
        label: 'Receitas',
        icon: 'cash',
        color: colors.entries.max,
    },
    outflows: {
        label: 'Despesas',
        icon: 'wallet',
        color: colors.outflows.max,
    },
} as const

export default function CustomTabBar({ state, navigation }: Props) {
    const insets = useSafeAreaInsets()

    return (
        <View
            style={{
                flexDirection: 'row',
                paddingBottom: insets.bottom,
                paddingTop: 12,
                backgroundColor: '#fff',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: '#0000001A'
            }}
        >
            {state.routes.map((route, index) => {
                const focused = state.index === index
                const config =
                    TAB_CONFIG[route.name as keyof typeof TAB_CONFIG]

                if (!config) return null

                return (
                    <TabButton
                        key={route.key}
                        label={config.label}
                        icon={config.icon}
                        activeColor={config.color}
                        focused={focused}
                        onPress={() => navigation.navigate(route.name)}
                    />
                )
            })}
        </View>
    )
}
