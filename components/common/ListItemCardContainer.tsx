import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native'

interface ListItemCardContainerProps {
    children: React.ReactNode
    bgColor: string
    setShowCard: React.Dispatch<React.SetStateAction<boolean>>
}

const { height } = Dimensions.get('window')

export function ListItemCardContainer({ children, bgColor, setShowCard }: ListItemCardContainerProps) {

    const slideAnim = useRef(new Animated.Value(height)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start()
    }, [fadeAnim, slideAnim])

    function closeCard(close: boolean) {
        if (close) setShowCard(false)
    }

    return (
        <TouchableWithoutFeedback onPress={() => closeCard(true)}>
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: bgColor, opacity: fadeAnim }
                ]}
            >
                <Pressable onPress={() => closeCard(false)}>
                    <Animated.View style={[styles.body, { transform: [{ translateY: slideAnim }] }]}>
                        {children}
                    </Animated.View>
                </Pressable>
            </Animated.View>
        </TouchableWithoutFeedback>

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