import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Easing, ScrollView } from 'react-native'

interface FormContainerProps {
    children: React.ReactNode
}

export default function FormContainer({ children }: FormContainerProps) {

    const scale = useRef(new Animated.Value(0.6)).current
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: 1,
                duration: 100,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            })
            ,
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start()
    }, [opacity, scale])

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [{ scale }],
                },
            ]}
        >
            <ScrollView contentContainerStyle={{ paddingBottom: 172 }}>
                {children}
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: 16,
        zIndex: 2,
    },
})
