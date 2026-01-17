import { useEffect, useRef } from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'

interface ListItemCardContainerProps {
    children: React.ReactNode
    bgColor: string
}

const { height } = Dimensions.get('window')

export function ListItemCardContainer({ children, bgColor }: ListItemCardContainerProps) {

    const slideAnim = useRef(new Animated.Value(height)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Dispara o Fade e o Slide juntos
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 450,
                useNativeDriver: true,
            })
        ]).start()
    }, [fadeAnim, slideAnim])

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: bgColor, opacity: fadeAnim }
            ]}
        >
            <Animated.View style={[styles.body, { transform: [{ translateY: slideAnim }] }]}>
                {children}
            </Animated.View>
        </Animated.View>

    )

}

const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        justifyContent: 'flex-end'
    },

    body: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    }

})