import { DocsContext } from '@/context/DocsContext'
import { useContext, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { YearOptionsList } from './YearOptionsList'
import { getMonthName } from '@/utils/common'
import { months } from '@/constants/common'
import { useShowMonths } from '@/hooks/index/useShowMonths'

export function YearButton() {

    const appDocs = useContext(DocsContext)
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth

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

    const showMonths = useShowMonths()

    const [showYearList, setShowYearList] = useState(false)

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Pressable
                        style={styles.button}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => {
                            if (showMonths) setShowYearList(true)
                        }}
                    >
                        <Ionicons name="calendar" size={16} color="#00000080" />
                        <Text style={styles.text}>{getMonthName(months, selectedMonth)} de {currentYear}</Text>
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