import { colors } from '@/styles/appColors'
import { View, Pressable, Text, StyleSheet } from 'react-native'

interface FinancePeriodButtonsProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function FinancePeriodButtons({ period, setPeriod }: FinancePeriodButtonsProps) {

    const checkPeriod = (button: string) => {
        return period === button
            ? colors.home.max
            : colors.home.midMax
    }

    return (
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={{
                        ...styles.button, backgroundColor: checkPeriod('monthly')
                    }}
                    onPress={() => setPeriod('monthly')}
                >
                    <Text style={{ color: 'white' }}>Mensal</Text>
                </Pressable>
                <Pressable
                    style={{
                        ...styles.button, backgroundColor: checkPeriod('daily'),
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4
                    }}
                    onPress={() => setPeriod('daily')}
                >
                    <Text style={{ color: 'white' }}>Diário</Text>
                </Pressable>
            </View>
    )

}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    }
})