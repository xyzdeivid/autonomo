import { Outflow } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import ContainerHandler from '../common/ContainerHandler'
import MoreInfoWarning from '../common/MoreInfoWarning'
import { moneyFormat } from '@/utils/common'
import ListInfoTitle from '../common/ListInfoTitle'
import { colors } from '@/styles/appColors'
import useGetOutflowsToShowOnTheList from '@/hooks/outflows/useGetOutflowsToShowOnTheList'

interface OutflowsListProps {
    setExpenseForDeletion: React.Dispatch<React.SetStateAction<string>>
    setDeleteOuflowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OutflowsList({ setExpenseForDeletion, setDeleteOuflowForm }: OutflowsListProps) {

    const outflows = useGetOutflowsToShowOnTheList()

    const deleteOuflow = (expense: Outflow) => {
        setExpenseForDeletion(expense._id)
        setDeleteOuflowForm(true)
    }

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    const getExpenseName = (expense: Outflow): string => {

        if (expense.amount) return `Reposição de ${expense.name}`

        return expense.name

    }

    return (
        <View>
            <ListInfoTitle
                text='despesas'
                color={colors.outflows.max}
            />
            <ContainerHandler>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                        <DataTable.Title style={styles.text}>Data</DataTable.Title>
                        <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                    </DataTable.Header>
                    {outflows.map(expense => {
                        return (
                            <DataTable.Row onPress={() => deleteOuflow(expense)} key={expense._id}>
                                <DataTable.Cell style={styles.text}>{getExpenseName(expense)}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{dateFormat(expense.date)}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{moneyFormat(expense.value)}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </ContainerHandler>
            <MoreInfoWarning />
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})