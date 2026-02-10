import React, { useEffect, useRef } from 'react'
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'

interface ValueOptionProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
    buttonColors: [string, string]
}

export default function ValueOption({
    choice,
    setChoice,
    buttonColors
}: ValueOptionProps) {

    const translateX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: choice === 'total' ? 0 : 1,
            useNativeDriver: true
        }).start()
    }, [choice, translateX])

    const sliderTranslate = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50] // largura do botão
    })

    return (
        <View style={[styles.wrapper, { backgroundColor: buttonColors[1] }]}>
            {/* Slider animado */}
            <Animated.View
                style={[
                    styles.slider,
                    {
                        backgroundColor: buttonColors[0],
                        transform: [{ translateX: sliderTranslate }]
                    }
                ]}
            />

            <Pressable
                style={styles.button}
                onPress={() => setChoice('total')}
            >
                <Text style={
                    { color: 'white' }
                }>
                    Total
                </Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => setChoice('un')}
            >
                <Text style={
                    { color: 'white' }
                }>
                    Un
                </Text>
            </Pressable>
        </View>
    )
}
const BUTTON_WIDTH = 50

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        position: 'relative',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        overflow: 'hidden'
    },

    slider: {
        position: 'absolute',
        width: BUTTON_WIDTH,
        height: '100%',
    },

    button: {
        width: BUTTON_WIDTH,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
