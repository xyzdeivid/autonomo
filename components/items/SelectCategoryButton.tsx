import { colors } from '@/styles/appColors'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

interface SelectCategoryButtonProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function SelectCategoryButton({
    category,
    setCategory
}: SelectCategoryButtonProps) {

    function getBackgroundColor(button: string) {

        if (button === category) return colors.items.max
        return colors.items.mid

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('product')
                }}
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
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('service')
                }}
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
