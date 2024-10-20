import { View, Pressable, Text, StyleSheet } from 'react-native'

interface FinancePeriodButtonsProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
    mgTop?: number
}

export default function FinancePeriodButtons({ period, setPeriod, mgTop }: FinancePeriodButtonsProps) {

    const checkPeriod = (button: string) => {
        return period === button
            ? '#000000'
            : '#404040'
    }

    return (
            <View style={{ ...styles.buttonsContainer, marginTop: mgTop ? mgTop : 0 }}>
            <Text style={{ marginEnd: 4 }} >Período:</Text>
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
                    <Text style={{ color: 'white' }}>Diário</Text>
                </Pressable>
            </View>
    )

}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 'auto',
        alignItems: 'center'
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    }
})