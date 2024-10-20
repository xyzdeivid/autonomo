import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'

import { DocsContext, Expense } from '@/context/DocsContext'
import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterExpenses } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import { Alert } from 'react-native'
import AboutExpenseCard from '@/components/expenses/AboutExpenseCard'
import { orderServices } from '@/functions/services'

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [services, setServices] = useContext(DocsContext).services
    const [selectedMonth] = useContext(MonthContext)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState({} as Expense)
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)

    const deleteExpense = (expense: Expense) => {

        const remainingExpenses = expenses.filter(current => {
            return current._id !== expense._id
        })

        if (expense.category === 'resale') {

            // Achando produto da despesa
            const productForExpense = services.find((service) => {
                return service._id === expense.productName
            })

            // Separando outros produtos
            const otherServicesAndProducts = services.filter(service => {
                return service !== productForExpense
            })

            if (productForExpense) {

                // Atualizando quantidade do produto
                productForExpense.amount = productForExpense.amount - expense.amount

                setServices(orderServices([...otherServicesAndProducts, productForExpense]))
                setExpenses(orderExpenses(remainingExpenses))
                setDeleteExpenseForm(false)

            }

        }
        
        setExpenses(orderExpenses(remainingExpenses))
        setDeleteExpenseForm(false)

    }

    return (
        <Container>
            {
                expenses[0] && (
                    <MonthInput />
                )
            }
            {
                filterExpenses(expenses, selectedMonth)[0]
                    ? <ExpensesList
                        filteredExpenses={filterExpenses(expenses, selectedMonth)}
                        setExpenseForDeletion={setExpenseForDeletion}
                        setDeleteExpenseForm={setDeleteExpenseForm}
                    />
                    : <AnyItemWarning text='Nenhuma saída cadastrada' />
            }
            {
                addExpenseForm
                    ? <AddExpenseForm setAddExpenseForm={setAddExpenseForm} />
                    : <AddItemButton setForm={setAddExpenseForm} bgColor='darkred' />
            }
            {
                deleteExpenseForm && (
                    <AboutExpenseCard
                        expense={expenseForDeletion}
                        deleteFunction={deleteExpense}
                        setFormOff={setDeleteExpenseForm}
                    />
                )
            }
        </Container>
    )
}