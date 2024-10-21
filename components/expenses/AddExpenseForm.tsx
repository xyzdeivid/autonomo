import { useContext, useEffect, useState } from 'react'
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
import { isThereAnotherService, orderExpenses, takeExistingService, takeRemainingServices } from '@/functions/expenses'
import FormInputs from '../common/FormInputs'
import ExpenseCategoryButtons from './ExpenseCategoryButtons'
import AmountInput from '../common/AmountInput'
import { checkServicesAmount, orderServices } from '@/functions/services'
import ProductNameInput from './ProductNameInput'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import LoadingScreen from '../common/LoadingScreen'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const [name, setName] = useState('')
    const [productName, setProductName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [resaleValue, setResaleValue] = useState(0)
    const [stock, setStock] = useState(0)
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [services, setServices] = useContext(DocsContext).services
    const [choice, setChoice] = useState('expense')
    const [loadingScreen, setLoadingScreen] = useState(false)

    const checkAllInputs = (): boolean => {

        switch (choice) {

            case 'expense':
                if (name && value) return true
                return false

            case 'resale':
                if(name && productName &&
                stock && value && resaleValue) return true
                return false
        
            default:
                return false

        }

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = () => {

        if (checkAllInputs()) {

            setLoadingScreen(true)

            // Criando nova despesa
            const newExpense = {} as Expense

            newExpense._id = generateId()
            newExpense.name = name
            newExpense.date = date

            if (choice === 'resale') {

                // Criando novo produto
                const newProduct: Service = {
                    category: 'product',
                    value: resaleValue,
                    _id: productName,
                    amount: stock
                }

                // Aplicando categoria a despesa
                newExpense.category = 'resale'
                newExpense.value = value * stock
                newExpense.amount = stock
                newExpense.productName = productName

                // Verificando se já existe um produto igual ao novo criado
                const alreadyExist = isThereAnotherService(services, newProduct)

                if (alreadyExist) {

                    // Pegando serviço existente
                    const existingService = takeExistingService(services, productName)

                    // Pegando outros serviços
                    const remainingServices = takeRemainingServices(services, existingService)

                    // Atualizando estoque e valor
                    existingService.amount = existingService.amount + stock
                    existingService.value = resaleValue

                    const newServices = [...remainingServices, existingService]

                    setTimeout(() => {
                        setServices(orderServices(newServices))
                        setExpenses(orderExpenses([...expenses, newExpense]))
                    }, 500)

                } else {

                    if (checkServicesAmount(services, newProduct)) {

                        setTimeout(() => {
                            setServices(orderServices([...services, newProduct]))
                            setExpenses(orderExpenses([...expenses, newExpense]))
                        }, 500)

                    } else {

                        setTimeout(() => {
                            Alert.alert('Você só pode registrar 8 items por categoria')
                        }, 700)

                    }

                }

            } else {

                // Aplicando categoria a despesa
                newExpense.category = 'expense'

                newExpense.value = value

                setTimeout(() => 
                    setExpenses(orderExpenses([...expenses, newExpense]))
                , 500)

            }

        } else {

            setTimeout(() => {
                Alert.alert(
                    'Preencha todos os campos',
                    'Todos os campos do formulário precisam ser preenchidos'
                )
            }, 700)

        }

        setTimeout(() => {
            setAddExpenseForm(false)
        setHideTabBar(false)
        }, 500)

    }

    return (
        <>
        {loadingScreen && <LoadingScreen />}
        <FormContainer setFormOff={setAddExpenseForm} bgColor='rgba(139, 0, 0, 0.1)'>
            <FormBody>
                <FormTitle text='Registrar Saída'>
                    <MaterialCommunityIcons name='format-float-right' size={24} color='darkgray' />
                </FormTitle>
                <FormInputs>
                    <ExpenseCategoryButtons choice={choice} setChoice={setChoice} />
                    <NameInput setName={setName} />
                    <DateInput
                        setTargetDate={setDate}
                        bgColor='#660000'
                    />
                    {choice === 'resale' && (
                        <ProductNameInput setProductName={setProductName} />
                    )}
                    {choice === 'resale' && (
                            <AmountInput
                                text='Quantidade (un)'
                                setAmount={setStock}
                            />
                    )}
                    <NumberInput
                        label={choice === 'resale'
                            ? 'Valor de Compra (un)'
                            : ''
                        }
                        setValue={setValue}
                    />
                    {choice === 'resale' && (
                        <NumberInput
                        label='Valor de Venda (un)'
                        setValue={setResaleValue}
                    />
                    )}
                </FormInputs>
                <SubmitFormButtons
                    submit={addExpense}
                    submitButtonText='Registrar'
                    submitButtonColor='darkred'
                />
            </FormBody>
        </FormContainer>
        </>
    )

}