import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
import { orderExpenses } from '@/functions/expenses'
import FormInputs from '../common/FormInputs'

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

    const addExpense = async () => {

        if (allInputsFilled) {

            const newExpense: Expense = {
                _id: generateId(),
                name,
                date,
                value
            }

            try {

                await AsyncStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]))

                setExpenses(orderExpenses([...expenses, newExpense]))

                setAddExpenseForm(false)

            } catch (error) {

                Alert.alert('Erro ao acessar banco de dados')

            }


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
                <FormInputs>
                    <NameInput setName={setName} />
                    <DateInput setTargetDate={setDate} />
                    <NumberInput setValue={setValue} />
                </FormInputs>
                <SubmitFormButtons
                    submit={addExpense}
                    setFormOff={setAddExpenseForm}
                    submitButtonText='Registrar'
                    submitButtonColor='darkred'
                />
            </FormBody>
        </FormContainer>
    )

}