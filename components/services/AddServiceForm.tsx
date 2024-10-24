import { Alert, Text } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { DocsContext, Expense } from '@/context/DocsContext'
import FormBody from '../common/FormBody'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { HideTabBarContext } from '@/context/HideTabBar'
import NameInput from '../common/NameInput'

import { checkAllInputs, checkIfThereIsAnotherService, checkServicesAmount, checkTitle, createNewService, orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import ServiceOrProductButtons from './ServiceOrProductButtons'
import AmountInput from '../common/AmountInput'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import LoadingScreen from '../common/LoadingScreen'
import ResaleButton from './ResaleButton'
import DateInput from '../common/DateInput'
import { generateId } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'

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
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [choice, setChoice] = useState('product')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addService = () => {

        if (checkAllInputs(choice, name, value, amount)) {

            setLoadingScreen(true)

            // Criando serviço
            const service = createNewService(choice, name, value, amount)

            // Verificando se o produto é uma revenda
            if (resale) {

                const newExpense: Expense = {
                    _id: generateId(),
                    name: name,
                    date: purchaseDate,
                    value: purchaseValue * amount
                }

                setExpenses(orderExpenses([...expenses, newExpense]))

            }

            // Configurando categoria para a lista de items
            if (!services[0] && setCategory) {
                setCategory(choice)
            }

            if (checkServicesAmount(services, service)) {

                // Verificando se já existe um serviço com o nome igual
                if (checkIfThereIsAnotherService(services, name)) {

                    setTimeout(() => {
                        Alert.alert('Item existente', 'Um item com este nome já existe')
                    }, 700)

                } else {

                    setTimeout(() => {
                        setServices(orderServices([...services, service]))
                    }, 500)

                }

            } else {

                setTimeout(() => {
                    Alert.alert('Você só pode registrar 8 items por categoria')
                }, 700)

            }

        } else {

            setTimeout(() => {
                Alert.alert(
                    'Preencha todos os campos',
                    'Todos os campos do formulário precisam ser preenchidos'
                )
            }, 700)

        }

        // Simulation of db query
        setTimeout(() => {
            setAddServiceForm(false)
            setHideTabBar(false)
            setButton(true)
        }, 500)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
                setFormOff={setAddServiceForm}
                setButton={setButton}
            >
                <FormBody>
                    <FormTitle
                        text={`Novo ${checkTitle(choice)}`}
                        textColor='#330066'
                    >
                        <MaterialCommunityIcons name='format-float-right' size={24} color='rgba(51, 0, 102, 0.2)' />
                    </FormTitle>
                    <FormInputs>
                        <ServiceOrProductButtons choice={choice} setChoice={setChoice} />
                        {choice === 'product' && (
                            <ResaleButton 
                                setResale={setResale}
                            />
                        )}
                        {choice === 'budget' && (
                            <Text style={{ marginBottom: 20, color: 'gray' }} >O valor será definido ao registrar entrada.</Text>
                        )}
                        <NameInput
                            setName={setName}
                            bgColor='rgba(51, 0, 102, 0.1)'
                        />
                        {resale && (
                            <>
                                <NumberInput
                                    setValue={setPurchaseValue}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    label='Valor de Compra (un)'
                                />
                                <DateInput
                                    setTargetDate={setPurchaseDate}
                                    bgColor='#330066'
                                    label='Data de Compra'
                                />
                            </>
                        )}
                        {choice !== 'budget' && (
                            <NumberInput
                                setValue={setValue}
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                        )}
                        {choice === 'product' && (
                            <AmountInput
                                text='Quantidade'
                                setAmount={setAmount}
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                        )}
                    </FormInputs>
                    <SubmitFormButtons submit={addService} submitButtonText='Cadastrar' submitButtonColor='#330066' />
                </FormBody>
            </FormContainer>
        </>
    )

}