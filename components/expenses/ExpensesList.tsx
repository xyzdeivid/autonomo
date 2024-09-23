import { DocsContext } from "@/context/DocsContext"
import { AntDesign } from "@expo/vector-icons"
import { format, parseISO } from "date-fns"
import { useContext } from "react"
import { StyleSheet } from "react-native"
import { DataTable } from "react-native-paper"

export default function ExpensesList() {

    const [expenses] = useContext(DocsContext).expenses

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
    }

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    return (
        <DataTable style={styles.container}>
            <DataTable.Header>
                <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                <DataTable.Title style={styles.text}>Data</DataTable.Title>
                <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                <DataTable.Title style={styles.text}>{''}</DataTable.Title>
            </DataTable.Header>
            {expenses.map(expense => {
                return (
                    <DataTable.Row key={expense._id}>
                        <DataTable.Cell style={styles.text}>{expense._id}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{dateFormat(expense.date)}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{moneyFormat(expense.value)}</DataTable.Cell>
                        <DataTable.Cell>
                            <AntDesign name='close' size={18} color='black' />
                        </DataTable.Cell>
                    </DataTable.Row>
                )
            })}
        </DataTable>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14
    },
    text: {
        justifyContent: 'center'
    }
})