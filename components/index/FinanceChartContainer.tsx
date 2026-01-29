import { StyleSheet, View } from 'react-native'

interface FinanceChartContainerProps {
    children: React.ReactNode
}

export function FinanceChartContainer({ children }: FinanceChartContainerProps) {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        height: 300,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    }

})