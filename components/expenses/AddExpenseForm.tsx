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
import { DocsContext, Expense, Service } from '@/context/DocsContext'
import { View, Alert } from 'react-native'
import { generateId } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import FormInputs from '../common/FormInputs'
import ExpenseCategoryButtons from './ExpenseCategoryButtons'
import AmountInput from '../common/AmountInput'
import { orderServices } from '@/functions/services'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const [allInputsFilled, setAllInputsFilled] = useState(false)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [resaleValue, setResaleValue] = useState(0)
    const [stock, setStock] = useState(0)
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [services, setServices] = useContext(DocsContext).services
    const [choice, setChoice] = useState('expense')

    useEffect(() => {
        if (name && value) setAllInputsFilled(true)
    }, [name, value])

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = async () => {

        if (allInputsFilled) {

            // const newExpense: Expense = {
            //     _id: generateId(),
            //     name,
            //     date,
            //     value
            // }

            const newExpense = {} as Expense

            newExpense._id = generateId()
            newExpense.name = name
            newExpense.date = date

            if (choice === 'resale') {

                // Agregando valor total a despesa
                newExpense.value = value * stock

                const newProduct: Service = {
                    category: 'product',
                    value: resaleValue,
                    _id: name,
                    amount: stock
                }

                try {

                    await AsyncStorage.setItem('services', JSON.stringify([...services, newProduct]))

                    setServices(orderServices([...services, newProduct]))

                } catch (error) {

                    Alert.alert('Erro ao acessar banco de dados')

                }

            } else {

                newExpense.value = value

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
        <FormContainer setFormOff={setAddExpenseForm}>
            <FormBody>
                <FormTitle text='Registrar Despesa' />
                <FormInputs>
                    <ExpenseCategoryButtons choice={choice} setChoice={setChoice} />
                    <NameInput setName={setName} />
                    <DateInput
                        setTargetDate={setDate}
                        bgColor='#660000'
                    />
                    <NumberInput
                        label={choice === 'resale'
                            ? 'Valor de Compra'
                            : ''
                        }
                        setValue={setValue}
                    />
                    {choice === 'resale' && (
                        <View>
                            <NumberInput
                                label='Valor de Venda'
                                setValue={setResaleValue}
                            />
                            <AmountInput
                                text='Estoque'
                                setAmount={setStock}
                            />
                        </View>
                    )}
                </FormInputs>
                <SubmitFormButtons
                    submit={addExpense}
                    submitButtonText='Registrar'
                    submitButtonColor='darkred'
                />
            </FormBody>
        </FormContainer>
    )

}