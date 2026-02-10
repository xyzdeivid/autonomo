import { colors } from '@/styles/appColors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StyleSheet, Text, View } from 'react-native'
import { CurrentMonthCard } from '../common/CurrentMonthCard'
import { useGetTheme } from '@/hooks/common/useGetTheme'

export function Info({ text }: { text: string }) {

    const theme = useGetTheme()

    return (
        <>
            <CurrentMonthCard />
            <View
                style={{
                    ...styles.container,
                    backgroundColor: theme === 'dark' ? colors.home.mid : colors.home.midMin
                }}
            >
                <FontAwesome
                    name="info-circle"
                    size={16}
                    color={theme === 'dark' ? colors.cardText.dark : colors.cardText.light}
                    style={{ marginEnd: 4 }}
                />
                <Text style={{
                    ...styles.text,
                    color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
                }}>
                    {text}
                </Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        marginBottom: 12,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        padding: 8,
        borderRadius: 8
    },

    text: {
        fontSize: 16,
        maxWidth: '95%',
        fontWeight: '500',
        color: '#000000C8'
    }

})