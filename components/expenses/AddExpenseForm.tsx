import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import DateInput from '../common/DateInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { HideTabBarContext } from '@/context/HideTabBar'
import NumberInput from '../common/NumberInput'
import { DocsContext } from '@/context/DocsContext'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

const getCurrentDate = () => {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const day = String(new Date().getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export default function AddExpenseForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [expenses, setExpenses] = useContext(DocsContext).expenses

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = () => {
        const newExpense = {
            _id: name,
            date,
            value
        }
        setExpenses([...expenses, newExpense])
        setAddExpenseForm(false)
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