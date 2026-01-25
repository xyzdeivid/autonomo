import { colors } from '@/styles/appColors'
import { useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface InsightSelectionButtonsProps {
    insightToShow: string
    setInsightToShow: React.Dispatch<React.SetStateAction<string>>
}

export function InsightSelectionButtons({
    insightToShow,
    setInsightToShow
}: InsightSelectionButtonsProps) {

    const translateX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: insightToShow !== 'monthly' ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start()
    }, [translateX, insightToShow])

    const sliderPosition = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 160]
    })

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.slider,
                    { left: sliderPosition }
                ]}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setInsightToShow('monthly')}
                activeOpacity={0.8}
            >
                <View style={styles.iconContainer}>
                    <AntDesign name="bar-chart" size={24} color="white" />
                </View>
                <Text
                    style={[
                        styles.text,
                        insightToShow === 'product' && styles.textActive
                    ]}
                >
                    Finanças Gerais
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setInsightToShow('daily')}
                activeOpacity={0.8}
            >
                <View style={styles.iconContainer}>
                    <AntDesign name="line-chart" size={24} color="white" />
                    </View>
                <Text
                    style={[
                        styles.text,
                        insightToShow !== 'product' && styles.textActive
                    ]}
                >
                    Receita Diária
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginHorizontal: 'auto',
        marginTop: 12,
        marginBottom: 28,
        backgroundColor: colors.home.mid,
        borderRadius: 6,
        overflow: 'hidden',
        height: 48,
        width: 320,
    },

    slider: {
        position: 'absolute',
        width: 160,
        height: '100%',
        backgroundColor: colors.home.max,
        borderRadius: 6
    },

    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },

    iconContainer: {
        padding: 4,
        borderRadius: 4,
        marginEnd: 4
    },

    text: {
        color: 'white',
        fontWeight: '500'
    },

    textActive: {
        fontWeight: '700'
    }

})