import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useContext } from 'react'
import { months } from '@/constants/common'
import { getMonthName } from '@/functions/common'
import { DocsContext } from '@/context/DocsContext'

interface InfoTitleProps {
    text: string
}

export default function InfoTitle({ text }: InfoTitleProps) {

    const appDocs = useContext(DocsContext)
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return (
        <View style={styles.titleContainer}>
            <FontAwesome name='info-circle' size={16} color='#FFFFFF' />
            <Text style={styles.titleText}>
                {text} do mês de {getMonthName(months, selectedMonth)}/{currentYear}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 24,
        backgroundColor: '#000000',
        marginHorizontal: 16,
        padding: 10,
        borderRadius: 10
    },

    titleText: {
        fontSize: 16,
        marginStart: 8,
        color: '#FFFFFF'
    }

})