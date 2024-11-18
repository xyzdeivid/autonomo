import { Alert, Text } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { DocsContext, Expense } from '@/context/DocsContext'
import FormBody from '../common/FormBody'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { MainDisplaysContext } from '@/context/MainDisplays'
import NameInput from '../common/NameInput'

import { checkAllInputs, checkIfThereIsAnotherService, checkServicesAmount, checkTitle, createNewService, orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import ServiceOrProductButtons from './ServiceOrProductButtons'
import AmountInput from '../common/AmountInput'
import LoadingScreen from '../common/LoadingScreen'
import ResaleButton from './ResaleButton'
import DateInput from '../common/DateInput'
import { generateId } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ValueOption from '../common/ValueOption'
import StockButton from './StockButton'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setCategory?: React.Dispatch<React.SetStateAction<string>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm, setCategory, setButton }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [services, setServices] = useContext(DocsContext).services
    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [choice, setChoice] = useState('product')
    const [valueChoice, setValueChoice] = useState('total')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [stock, setStock] = useState(false)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addService = async () => {

        if (checkAllInputs(choice, name, value, amount, resale, stock)) {

            setLoadingScreen(true)

            // Criando serviço
            const service = createNewService(choice, name, value, amount)

            // Verificando se o produto é uma revenda
            if (resale) {

                const newExpenseValue =
                    valueChoice === 'total'
                        ? purchaseValue
                        : purchaseValue * amount

                const newExpense: Expense = {
                    _id: generateId(),
                    name: name,
                    date: purchaseDate,
                    value: newExpenseValue,
                    amount: amount
                }

                try {

                    await AsyncStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]))
                    setExpenses(orderExpenses([...expenses, newExpense]))

                } catch (err) {

                    Alert.alert('Erro ao acessar banco de dados')

                }

            }

            // Configurando categoria para a lista de items
            if (!services[0] && setCategory) {
                setCategory(choice)
            }

            if (checkServicesAmount(services, service)) {

                // Verificando se já existe um serviço com o nome igual
                if (checkIfThereIsAnotherService(services, name)) {

                    Alert.alert('Item existente', 'Um item com este nome já existe')

                } else {

                    try {

                        await AsyncStorage.setItem('items', JSON.stringify([...services, service]))
                        setServices(orderServices([...services, service]))

                    } catch (err) {

                        Alert.alert('Erro ao acessar banco de dados')

                    }

                }

            } else {

                Alert.alert('Você só pode registrar 8 items por categoria')

            }

        } else {

            Alert.alert(
                'Preencha todos os campos',
                'Todos os campos do formulário precisam ser preenchidos'
            )

        }

        setAddServiceForm(false)
        setHideTabBar(false)
        setButton(true)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
                setFormOff={setAddServiceForm}
                setButton={setButton}
            >
                <FormBody borderColor='rgba(51, 0, 102, 0.1)'>
                    <FormTitle
                        text={`Novo ${checkTitle(choice)}`}
                        textColor='#330066'
                    />
                    <FormInputs>
                        <ServiceOrProductButtons choice={choice} setChoice={setChoice} />
                        {choice === 'product' && (
                            <ResaleButton
                                resale={resale}
                                setResale={setResale}
                            />
                        )}
                        <NameInput
                            setName={setName}
                            bgColor='rgba(51, 0, 102, 0.1)'
                            textColor='#330066'
                        />
                        {choice === 'budget' && (
                            <Text style={{ marginBottom: 20, color: 'rgba(51, 0, 102, 0.5)' }} >O valor será definido ao registrar entrada.</Text>
                        )}
                        {choice === 'product' && resale && (
                            <>
                                <DateInput
                                    setTargetDate={setPurchaseDate}
                                    bgColor='#330066'
                                    label='Data de Compra'
                                    textColor='#330066'
                                />
                                <NumberInput
                                    setValue={setPurchaseValue}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    label={valueChoice === 'total' ? 'Valor de Compra (total)' : 'Valor de Compra (un)'}
                                    textColor='#330066'
                                />
                                <ValueOption
                                    choice={valueChoice}
                                    setChoice={setValueChoice}
                                    buttonColors={['#330066', '#6600CC']}
                                />
                            </>
                        )}
                        {choice !== 'budget' && (
                            <NumberInput
                                setValue={setValue}
                                bgColor='rgba(51, 0, 102, 0.1)'
                                textColor='#330066'
                                label={choice === 'product' ? 'Valor de Venda (un)' : ''}
                            />
                        )}
                        {choice === 'product' && !resale && (
                            <StockButton
                                stock={stock}
                                setStock={setStock}
                            />
                        )}
                        {resale || stock ? (
                            <AmountInput
                                text='Quantidade'
                                setAmount={setAmount}
                                bgColor='rgba(51, 0, 102, 0.1)'
                                textColor='#330066'
                            />
                        ) : null}
                    </FormInputs>
                    <SubmitFormButtons submit={addService} submitButtonText='Cadastrar' submitButtonColor='#330066' />
                </FormBody>
            </FormContainer>
        </>
    )

}