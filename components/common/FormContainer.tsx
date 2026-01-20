import { useEffect, useRef } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

interface FormContainerProps {
    children: React.ReactNode
}

const { height } = Dimensions.get('window')

export default function FormContainer({ children }: FormContainerProps) {

    const slideAnim = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start()
    }, [slideAnim])

    return (
        <Animated.View
            style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
        >
            <View>
                {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        padding: 16
    }
})