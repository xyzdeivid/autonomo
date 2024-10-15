import { Expense } from '@/context/DocsContext'
import { format, parseISO } from 'date-fns'
import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import ContainerHandler from '../common/ContainerHandler'
import MoreInfoWarning from '../common/MoreInfoWarning'

interface ExpensesListProps {
    filteredExpenses: Expense[]
    setExpenseForDeletion: React.Dispatch<React.SetStateAction<Expense>>
    setDeleteExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExpensesList({ filteredExpenses, setExpenseForDeletion, setDeleteExpenseForm }: ExpensesListProps) {

    const deleteExpense = (expense: Expense) => {
        setExpenseForDeletion(expense)
        setDeleteExpenseForm(true)
    }

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    return (
        <View>
            <ContainerHandler filteredTargets={filteredExpenses}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                        <DataTable.Title style={styles.text}>Data</DataTable.Title>
                    </DataTable.Header>
                    {filteredExpenses.map(expense => {
                        return (
                            <DataTable.Row onPress={() => deleteExpense(expense)} key={expense._id}>
                                <DataTable.Cell style={styles.text}>{expense.name}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{dateFormat(expense.date)}</DataTable.Cell>
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