import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import DateInput from '../common/DateInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { HideTabBarContext } from '@/context/HideTabBar'
import { DocsContext, Expense, Service } from '@/context/DocsContext'
import { Alert, Text } from 'react-native'
import { generateId } from '@/functions/common'
import { isThereAnotherService, orderExpenses, takeExistingService, takeRemainingServices } from '@/functions/expenses'
import FormInputs from '../common/FormInputs'
import IntegrateStockButton from './IntegrateStockButton'
import { checkServicesAmount, orderServices } from '@/functions/services'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import LoadingScreen from '../common/LoadingScreen'
import NumberInput from '../common/NumberInput'
import ProductOptionsInput from './ProductOptionsInput'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm, setButton }: AddExpenseFormProps) {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [services] = useContext(DocsContext).services
    const products = services.filter(service => service.category === 'product')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [stockIntegrate, setStockIntegrate] = useState(false)
    const [product, setProduct] = useState(products[0] ? products[0]._id : '')

    const checkAllInputs = (): boolean => {

        if (!stockIntegrate) {
            if (name && value) return true
            return false
        }

        if (value) return true
        return false

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = () => {

        if (checkAllInputs()) {

            setLoadingScreen(true)

            // Criando nova despesa
            const newExpense: Expense = {
                _id: generateId(),
                name: !stockIntegrate ? name : product,
                date,
                value
            } 

            setTimeout(() =>
                setExpenses(orderExpenses([...expenses, newExpense]))
            , 500)

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
            setButton(true)
        }, 500)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
                setFormOff={setAddExpenseForm}
                bgColor='rgba(139, 0, 0, 0.1)'
                setButton={setButton}
            >
                <FormBody>
                    <FormTitle text='Registrar Saída' textColor='#660000'>
                        <MaterialCommunityIcons name='format-float-right' size={24} color='rgba(102, 0, 0, 0.2)' />
                    </FormTitle>
                    <FormInputs>
                        {products[0] && (
                            <IntegrateStockButton
                                setStockIntegrate={setStockIntegrate}
                            />
                        )}
                        {
                            !stockIntegrate
                                ? <NameInput
                                    setName={setName}
                                    bgColor='rgba(102, 0, 0, 0.1)'
                                />
                                : <ProductOptionsInput
                                    products={products}
                                    setProduct={setProduct}
                                />
                        }
                        <DateInput
                            setTargetDate={setDate}
                            bgColor='#660000'
                        />
                        <NumberInput
                            setValue={setValue}
                            bgColor='rgba(102, 0, 0, 0.1)'
                        />
                    </FormInputs>
                    <SubmitFormButtons
                        submit={addExpense}
                        submitButtonText='Registrar'
                        submitButtonColor='#660000'
                    />
                </FormBody>
            </FormContainer>
        </>
    )

}