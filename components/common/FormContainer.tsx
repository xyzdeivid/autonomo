import { MainDisplaysContext } from '@/context/MainDisplays'
import { useContext, useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Animated } from 'react-native'

interface FormContainerProps {
    children: React.ReactNode
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    bgColor?: string
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormContainer({ children, setFormOff, bgColor, setButton }: FormContainerProps) {

    const displays = useContext(MainDisplaysContext)
    const [, setHideTabBar] = displays.tabBar
    

    const slideAnim = useRef(new Animated.Value(1000)).current

    useEffect(() => {

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start()

    }, [])

    const closeForm = (key: string) => {
        if (key !== 'body') {
            setFormOff(false)
            setButton(true)
        }
    }

    return (
        <Animated.View
            style={{
                ...styles.animation,
                transform: [{ translateY: slideAnim }]
            }}
        >
            <Pressable
                onPress={() => closeForm('container')}
                style={styles.container}
            >
                <Pressable onPress={() => closeForm('body')}>
                    {children}
                </Pressable>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    animation: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})