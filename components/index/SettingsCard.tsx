import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native'
import { SettingsOptions } from './SettingsOptions'
import { useEffect, useRef, useState } from 'react'
import { AvailableMonthsOptionsList } from './AvailableMonthsOptionsList'
import { ThemeOptionsList } from './ThemeOptionsList'

const { height } = Dimensions.get('window')

export function SettingsCard({ setShowSettingsCard }:
    { setShowSettingsCard: React.Dispatch<React.SetStateAction<boolean>> }) {

    const slideAnim = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }, [slideAnim])

    const [showAvailableMonthsOptionsList, setShowAvailableMonthsOptionsList] = useState(false)
    const [showThemeOptionsList, setShowThemeOptionsList] = useState(false)

    return (
        <>
            <Pressable style={styles.container} onPress={() => setShowSettingsCard(false)}>
                <Animated.View
                    style={[
                        styles.overlay,
                        { transform: [{ translateY: slideAnim }] }
                    ]}>
                    <Pressable onPress={() => { }}>
                        <SettingsOptions
                            setShowAvailableMonthsOptionsList={setShowAvailableMonthsOptionsList}
                            setShowThemeOptionsList={setShowThemeOptionsList}
                        />
                    </Pressable>
                </Animated.View>
            </Pressable >
            {
                showAvailableMonthsOptionsList &&
                <AvailableMonthsOptionsList
                    setShowAvailableMonthsOptionsList={setShowAvailableMonthsOptionsList}
                    setShowSettingsCard={setShowSettingsCard}
                />
            }
            {
                showThemeOptionsList &&
                <ThemeOptionsList
                    setShowThemeOptionsList={setShowThemeOptionsList}
                    setShowSettingsCard={setShowSettingsCard}
                />
            }
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex: 1
    },

    overlay: {
        backgroundColor: '#fff',
        borderTopRightRadius: 8
    }

})