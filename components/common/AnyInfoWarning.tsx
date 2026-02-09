import { useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native'
import { CurrentMonthCard } from './CurrentMonthCard'

interface AnyInfoWarningProps {
    text: string,
    titleBgColor: string
    textBgColor: string
    addDataButtonText?: string
    onAddDataButtonPress?: () => void
}

export default function AnyInfoWarning({ text,
    titleBgColor,
    textBgColor,
    addDataButtonText,
    onAddDataButtonPress
}: AnyInfoWarningProps) {

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
        <View style={styles.overlay}>
            <View style={{ alignSelf: 'stretch', marginHorizontal: 24 }}>
                <CurrentMonthCard />
            </View>
            <View style={styles.container}>
                <Text style={{
                    ...styles.warningTextTitle,
                    backgroundColor: titleBgColor
                }}>
                    Nenhuma informação disponível!
                </Text>
                <Text style={{
                    ...styles.warningText,
                    backgroundColor: textBgColor
                }}>
                    Nesta seção, {text}
                </Text>
            </View>
            {
                addDataButtonText && onAddDataButtonPress
                    ?
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <Pressable
                            style={{
                                ...styles.addDataButton,
                                backgroundColor: textBgColor,
                                borderColor: titleBgColor
                            }}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={onAddDataButtonPress}
                        >
                            <Text style={{ color: titleBgColor }}>{addDataButtonText}</Text>
                        </Pressable>
                    </Animated.View>
                    : null
            }
        </View>
    )

}

const styles = StyleSheet.create({

    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        marginHorizontal: 24
    },

    warningTextTitle: {
        textAlign: 'center',
        color: '#FFFFFF',
        padding: 12,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        fontSize: 16
    },

    warningText: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },

    addDataButton: {
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
        borderWidth: StyleSheet.hairlineWidth
    }

})