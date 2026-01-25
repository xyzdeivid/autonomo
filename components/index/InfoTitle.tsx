import { View, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { months } from '@/constants/common'
import { getMonthName } from '@/utils/common'
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
            <Text style={styles.titleText}>
                {text} de {getMonthName(months, selectedMonth)}/{currentYear}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    titleContainer: {
        
    },

    titleText: {
        fontSize: 20,
        textAlign: 'center'
    }

})