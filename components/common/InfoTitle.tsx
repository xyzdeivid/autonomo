import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useContext } from 'react'
import { MonthContext } from '@/context/Month'

interface InfoTitleProps {
    text: string
}

export default function InfoTitle({ text }: InfoTitleProps) {

    const [selectedMonth] = useContext(MonthContext)

    const months: [string, number][] = [
        ['Janeiro', 0],
        ['Fevereiro', 1],
        ['Março', 2],
        ['Abril', 3],
        ['Maio', 4],
        ['Junho', 5],
        ['Julho', 6],
        ['Agosto', 7],
        ['Setembro', 8],
        ['Outubro', 9],
        ['Novembro', 10],
        ['Dezembro', 11]
    ]

    return (
        <View style={styles.titleContainer}>
            <FontAwesome name='info-circle' size={16} color='black' />
            <Text style={styles.titleText}>{text} do mês de {months[selectedMonth][0]}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 8,
        marginBottom: 10
    },
    titleText: {
        fontSize: 16,
        marginStart: 4
    }
})