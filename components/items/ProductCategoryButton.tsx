import { colors } from '@/constants/appColors'
import { Pressable, Text, StyleSheet } from 'react-native'

interface ProductCategoryButtonProps {
    onPress: () => void
    categoryName: string
    categoryEx: string
}

export function ProductCategoryButton({ onPress, categoryName, categoryEx }: ProductCategoryButtonProps) {

    return (
        <Pressable
            style={{
                ...styles.button,
                backgroundColor: colors.items.min
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    ...styles.infoText,
                    color: colors.items.max
                }}
            >
                {categoryName}
            </Text>
            <Text
                style={styles.exampleText}
            >
                {categoryEx}
            </Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        padding: 12,
        borderRadius: 6,
        marginBottom: 24
    },

    infoText: {
        marginBottom: 6,
        fontSize: 16
    },

    exampleText: {
        backgroundColor: colors.items.max,
        color: '#FFFFFF',
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start'
    }

})