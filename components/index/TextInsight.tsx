import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

export function TextInsight({ text }: { text: string }) {

    const theme = useGetTheme()

    return (
        <View 
        style={styles.container}
        >
            <View
                style={{
                    ...styles.insightTextContainer,
                    backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light
                }}
            >
                <AntDesign
                    name='exclamation-circle'
                    size={12}
                    color={theme === 'dark' ? colors.cardText.dark : colors.cardText.light}
                />
                <Text
                    style={{
                        ...styles.insightText,
                        color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 20
    },

    insightTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        borderRadius: 8
    },

    insightText: {
        fontStyle: 'italic',
        marginStart: 4,
        marginBottom: 1,
        maxWidth: '95%'
    }

})