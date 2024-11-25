import { DocsContext } from '@/context/DocsContext'
import { MonthContext } from '@/context/Month'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ListInfoTitleProps {
    text: string
    color: string
}

export default function ListInfoTitle({ text, color }: ListInfoTitleProps) {

    const [currentYear] = useContext(DocsContext).currentYear

    const [selectedMonth] = useContext(MonthContext)

    const monthName = () => {

        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]

        return months[selectedMonth]

    }

    return (
        <View style={styles.container}>
            <Text
                style={{
                    ...styles.text,
                    color: color
                }}
            >
                Suas {text} do mês de {monthName()}/{currentYear}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 20,
        marginBottom: 14,
        marginStart: 8
    },

    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    }

})