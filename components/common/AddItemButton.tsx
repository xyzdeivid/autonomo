import {
    Pressable,
    StyleSheet,
    View,
    Animated
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
        <View style={styles.container}>
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
                    <FontAwesome6 
                    name='plus' 
                    color={iconColor} 
                    size={24} 
                    />
                </Pressable>
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 0,
        width: '100%',
        marginBottom: 16
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 6,
        marginEnd: 16,
        borderWidth: StyleSheet.hairlineWidth
    }
})