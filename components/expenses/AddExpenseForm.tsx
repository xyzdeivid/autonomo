import { useContext, useEffect, useState } from 'react'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import DateInput from '../common/DateInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { DocsContext, Expense } from '@/context/DocsContext'
import { Alert } from 'react-native'
import { generateId } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import FormInputs from '../common/FormInputs'
import IntegrateStockButton from './IntegrateStockButton'
import { orderServices } from '@/functions/services'
import LoadingScreen from '../common/LoadingScreen'
import NumberInput from '../common/NumberInput'
import ProductOptionsInput from './ProductOptionsInput'
import AmountInput from '../common/AmountInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ValueOption from '../common/ValueOption'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm, setButton }: AddExpenseFormProps) {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [services, setServices] = useContext(DocsContext).services
    const products = services.filter(item => item.resale)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [stockIntegrate, setStockIntegrate] = useState(false)
    const [product, setProduct] = useState(products[0])
    const [valueChoice, setValueChoice] = useState('total')

    const checkAllInputs = (): boolean => {

        if (!stockIntegrate) {
            if (name && value) return true
            return false
        }

        if (value && amount) return true
        return false

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addExpense = async () => {

        if (checkAllInputs()) {

            setLoadingScreen(true)

            const resaleValue =
                valueChoice === 'total'
                    ? value
                    : value * amount

            // Criando nova despesa
            const newExpense: Expense = {
                _id: generateId(),
                name: !stockIntegrate ? name : product._id,
                date,
                value: !stockIntegrate ? value : resaleValue,
            }

            if (stockIntegrate) {

                newExpense.amount = amount

                // Atualizando estoque do produto selecionado
                const productToUpdate = products.find(current =>
                    current._id === product._id
                )
                if (productToUpdate) {

                    if (productToUpdate.amount) {
                        productToUpdate.amount = productToUpdate.amount + amount
                    } else {
                        productToUpdate.amount = amount
                    }

                    const remainingItems = services.filter(current => {
                        return current._id !== productToUpdate._id
                    })

                    try {

                        await AsyncStorage.setItem('items', JSON.stringify([...remainingItems, productToUpdate]))
                        setServices(orderServices([...remainingItems, productToUpdate]))

                    } catch (err) {

                        Alert.alert('Erro ao acessar banco de dados')

                    }

                }

            }

            try {

                await AsyncStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]))
                setExpenses(orderExpenses([...expenses, newExpense]))

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        } else {

            Alert.alert(
                'Preencha todos os campos',
                'Todos os campos do formulário precisam ser preenchidos'
            )

        }

        setAddExpenseForm(false)
        setHideTabBar(false)
        setButton(true)

    }

    const checkResaleButtonText = () => {
        return !stockIntegrate
            ? ''
            : valueChoice === 'total' ? 'Valor de Compra (total)' : 'Valor de Compra (un)'
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
                setFormOff={setAddExpenseForm}
                bgColor='rgba(139, 0, 0, 0.1)'
                setButton={setButton}
            >
                <FormBody borderColor='rgba(102, 0, 0, 0.1)'>
                    <FormTitle text='Nova Saída' textColor='#660000' />
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
                                    textColor='#660000'
                                />
                                : <ProductOptionsInput
                                    product={product}
                                    setProduct={setProduct}
                                    products={products}
                                />
                        }
                        <DateInput
                            setTargetDate={setDate}
                            bgColor='#660000'
                            textColor='#660000'
                        />
                        <NumberInput
                            setValue={setValue}
                            bgColor='rgba(102, 0, 0, 0.1)'
                            textColor='#660000'
                            label={checkResaleButtonText()}
                        />
                        {stockIntegrate && (
                            <>
                                <ValueOption
                                    choice={valueChoice}
                                    setChoice={setValueChoice}
                                    buttonColors={['#660000', '#990000']}
                                />
                                <AmountInput
                                    setAmount={setAmount}
                                    text='Quantidade'
                                    bgColor='rgba(102, 0, 0, 0.1)'
                                    textColor='#660000'
                                />
                            </>
                        )}
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