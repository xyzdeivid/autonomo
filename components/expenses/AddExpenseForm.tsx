import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import DateInput from '../common/DateInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { HideTabBarContext } from '@/context/HideTabBar'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const [name, setName] = useState('')
    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = () => { }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Despesa' />
                <NameInput setName={setName} />
                <DateInput />
                <SubmitFormButtons submit={addExpense} setFormOff={setAddExpenseForm} submitButtonText='Registrar' />
            </FormBody>
        </FormContainer>
    )

}