import { useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SettingsCard } from './SettingsCard'

export function SettingsButton() {

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

    const [showSettingsCard, setShowSettingsCard] = useState(false)

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Pressable
                        style={styles.button}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => {
                            setShowSettingsCard(true)
                        }}
                    >
                        <Ionicons name="settings" size={24} color="#00000080" />
                    </Pressable>
                </Animated.View>
            </View>
            {showSettingsCard && <SettingsCard setShowSettingsCard={setShowSettingsCard} />}
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-start',
        marginBottom: 12,
        marginStart: 12
    },

    button: {
        backgroundColor: '#ebebeb',
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#00000040'
    },

    text: {
        fontSize: 16,
        color: '#00000080',
        marginStart: 4
    }

})