import { View, Pressable, Text, StyleSheet } from 'react-native'

interface FinancePeriodButtonsProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function FinancePeriodButtons({ period, setPeriod }: FinancePeriodButtonsProps) {

    const checkPeriod = (button: string) => {
        return period === button
            ? 'darkgreen'
            : 'green'
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    ...styles.button, backgroundColor: checkPeriod('monthly'),
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4
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
                <Text style={{ color: 'white' }}>Diária</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginStart: 8,
    },
    button: {
        padding: 8
    }
})