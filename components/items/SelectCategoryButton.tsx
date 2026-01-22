import { colors } from '@/styles/appColors'
import { useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native'

interface SelectCategoryButtonProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function SelectCategoryButton({
    category,
    setCategory
}: SelectCategoryButtonProps) {

    const translateX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: category !== 'product' ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start()
    }, [translateX, category])

    const sliderPosition = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    })

    console.log(category)

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
                onPress={() => setCategory('product')}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        category === 'product' && styles.textActive
                    ]}
                >
                    Produtos
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setCategory('service')}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        category !== 'product' && styles.textActive
                    ]}
                >
                    Serviços
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        backgroundColor: colors.items.mid,
        borderRadius: 6,
        overflow: 'hidden',
        height: 36,
        width: 200,
        marginStart: 12,
        marginVertical: 12,
    },

    slider: {
        position: 'absolute',
        width: 100,
        height: '100%',
        backgroundColor: colors.items.max,
        borderRadius: 6
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },

    text: {
        color: 'white',
        fontWeight: '500'
    },

    textActive: {
        fontWeight: '700'
    }

})
