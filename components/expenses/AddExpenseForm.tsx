import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import DateInput from '../common/DateInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { HideTabBarContext } from '@/context/HideTabBar'
import NumberInput from '../common/NumberInput'
import { DocsContext, Expense } from '@/context/DocsContext'
import { Alert } from 'react-native'
import { generateId } from '@/functions/common'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const [allInputsFilled, setAllInputsFilled] = useState(false)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [expenses, setExpenses] = useContext(DocsContext).expenses

    useEffect(() => {
        if (name && value) setAllInputsFilled(true)
    }, [name, value])

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = () => {

        if (allInputsFilled) {

            const newExpense: Expense = {
                _id: generateId(),
                name,
                date,
                value
            }
            setExpenses([...expenses, newExpense])
            setAddExpenseForm(false)

        } else {

            setAddExpenseForm(false)
            setHideTabBar(false)
            setTimeout(() => {
                Alert.alert(
                    'Preencha todos os campos',
                    'Todos os campos do formulário precisam ser preenchidos'
                )
            }, 500)
            
        }

    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Despesa' />
                <NameInput setName={setName} />
                <DateInput setTargetDate={setDate} />
                <NumberInput setValue={setValue} />
                <SubmitFormButtons submit={addExpense} setFormOff={setAddExpenseForm} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}