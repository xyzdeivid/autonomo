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
        backgroundColor: '#F5F7F8',
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#0000001A',
        height: 300,
        justifyContent: 'center',
        overflow: 'hidden'
    }

})