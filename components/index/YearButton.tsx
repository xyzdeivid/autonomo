import { DocsContext } from '@/context/DocsContext'
import { useContext, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { YearOptionsList } from './YearOptionsList'

export function YearButton() {

    const [currentYear] = useContext(DocsContext).currentYear

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

    const [showYearList, setShowYearList] = useState(false)

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Pressable
                        style={styles.button}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => setShowYearList(true)}
                    >
                        <Ionicons name="calendar" size={16} color="#00000080" />
                        <Text style={styles.text}>{currentYear}</Text>
                    </Pressable>
                </Animated.View>
            </View>
            {showYearList && <YearOptionsList setShowYearList={setShowYearList} />}
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-start',
        marginBottom: 16,
        marginStart: 16
    },

    button: {
        backgroundColor: '#0000001A',
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