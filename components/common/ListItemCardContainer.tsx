import { useEffect, useRef } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'

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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ ...styles.container, backgroundColor: bgColor }}
            >
                <View style={styles.body}>
                    {children}
                </View>
            </KeyboardAvoidingView></Animated.View>

    )

}

const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        justifyContent: 'center'
    },

    body: {
        borderRadius: 20,
        margin: 16,
        overflow: 'hidden'
    }

})