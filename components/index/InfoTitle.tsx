import { View, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { months } from '@/constants/common'
import { getMonthName } from '@/utils/common'
import { DocsContext } from '@/context/DocsContext'
import { colors } from '@/styles/appColors'

interface InfoTitleProps {
    text: string
}

export default function InfoTitle({ text }: InfoTitleProps) {

    const appDocs = useContext(DocsContext)
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
                {text} de {getMonthName(months, selectedMonth)}/{currentYear}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    titleContainer: {
        alignSelf: 'flex-start',
        marginTop: 24,
        marginBottom: 12,
        backgroundColor: colors.home.max,
        padding: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },

    titleText: {
        fontSize: 20,
        color: '#FFFFFF'
    }

})