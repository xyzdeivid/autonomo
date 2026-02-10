import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'
import { Pressable, Text, StyleSheet } from 'react-native'

interface ProductCategoryButtonProps {
    onPress: () => void
    categoryName: string
    categoryEx: string
}

export function ProductCategoryButton({
    onPress,
    categoryName,
    categoryEx,
}: ProductCategoryButtonProps) {

    const theme = useGetTheme()

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { borderColor: theme === 'dark' ? '#FFF' : colors.items.midMin },
                {
                    backgroundColor: pressed
                        ? theme === 'dark' ? 'black' : 'white'
                        : theme === 'dark' ? colors.items.midMin : colors.items.min
                },
            ]}
        >
            <Text style={[styles.infoText, { color: theme === 'dark' ? '#FFF' : colors.items.max }]}>
                {categoryName}
            </Text>

            <Text style={styles.exampleText}>{categoryEx}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        padding: 16,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth
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