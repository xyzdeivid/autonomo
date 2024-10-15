import { Entypo } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

interface BudgetsListProps {
    budgets: {
        service: string;
        amount: number;
        color: string;
    }[]
}

export default function BudgetsList({ budgets }: BudgetsListProps) {

    return (
        <View style={styles.container}>
            {budgets.map(current => {
                return (
                    <View key={current.service} style={styles.infoContainer}>
                        <Entypo name='flickr-with-circle' size={16} color={current.color} />
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>{current.service}:</Text> {current.amount}x</Text>
                    </View>
                )
            })}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginStart: 8,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    text: {
        marginStart: 4
    }
})