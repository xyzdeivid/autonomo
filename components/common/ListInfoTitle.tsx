import { months } from '@/constants/common'
import { DocsContext } from '@/context/DocsContext'
import { getMonthName } from '@/functions/common'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ListInfoTitleProps {
    text: string
    color: string
}

export default function ListInfoTitle({ text, color }: ListInfoTitleProps) {

    const appDocs = useContext(DocsContext)

    const [currentYear] = appDocs.currentYear

    const [selectedMonth] = appDocs.selectedMonth

    return (
        <View style={styles.container}>
            <Text
                style={{
                    ...styles.text,
                    color: color
                }}
            >
                Suas {text} do mês de {getMonthName(months, selectedMonth)}/{currentYear}
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