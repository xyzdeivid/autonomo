import { View, Pressable, Text, StyleSheet } from 'react-native'

interface FinancePeriodButtonsProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function FinancePeriodButtons({ period, setPeriod }: FinancePeriodButtonsProps) {

    const checkPeriod = (button: string) => {
        return period === button
            ? ['darkgreen', 'white']
            : ['transparent', 'black']
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{ ...styles.button, backgroundColor: checkPeriod('monthly')[0] }}
                onPress={() => setPeriod('monthly')}
            >
                <Text style={{ color: checkPeriod('monthly')[1] }}>Mensal</Text>
            </Pressable>
            <Pressable
                style={{ ...styles.button, backgroundColor: checkPeriod('daily')[0] }}
                onPress={() => setPeriod('daily')}
            >
                <Text style={{ color: checkPeriod('daily')[1] }}>Diária</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginStart: 8
    },
    button: {
        marginEnd: 8,
        padding: 8,
        borderRadius: 4
    }
})