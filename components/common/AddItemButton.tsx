import {
    Pressable,
    StyleSheet,
    Animated,
    View
} from 'react-native'
import { useRef } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

interface AddItemButtonProps {
    iconColor: string
    bgColor: string
    borderColor: string
    onPress: () => void
}

export default function AddItemButton({
    iconColor,
    bgColor,
    borderColor,
    onPress
}: AddItemButtonProps) {

    const scale = useRef(new Animated.Value(1)).current

    function handlePressIn() {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true
        }).start()
    }

    function handlePressOut() {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <Animated.View style={{ transform: [{ scale }] }}>
                <Pressable
                    style={[
                        styles.button,
                        {
                            borderColor: borderColor,
                            backgroundColor: bgColor
                        }
                    ]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                >
                    <FontAwesome6 name="plus" color={iconColor} size={24} />
                </Pressable>
            </Animated.View>
        </View>
    )

}


const styles = StyleSheet.create({

    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        margin: 8,
        borderWidth: StyleSheet.hairlineWidth
    }
})