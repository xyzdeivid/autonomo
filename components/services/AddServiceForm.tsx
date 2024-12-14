import { Alert, Text } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { DocsContext, Outflow } from '@/context/DocsContext'
import FormBody from '../common/FormBody'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { MainDisplaysContext } from '@/context/MainDisplays'
import NameInput from '../common/NameInput'

import { checkAllInputs, checkIfThereIsAnotherService, 
    checkServicesAmount, checkTitle, createNewOutflow, 
    createNewService, orderServices 
} from '@/functions/services'
import FormInputs from '../common/FormInputs'
import ServiceOrProductButtons from './ServiceOrProductButtons'
import AmountInput from '../common/AmountInput'
import LoadingScreen from '../common/LoadingScreen'
import ResaleButton from './ResaleButton'
import DateInput from '../common/DateInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ValueOption from '../common/ValueOption'
import StockButton from './StockButton'
import React from 'react'
import { warning } from '@/functions/common'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setCategory?: React.Dispatch<React.SetStateAction<string>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm, setCategory, setButton }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [services, setServices] = useContext(DocsContext).items
    const [expenses, setExpenses] = useContext(DocsContext).outflows
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [choice, setChoice] = useState('product')
    const [valueChoice, setValueChoice] = useState('total')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [stock, setStock] = useState(true)

    const isThereAmount = () => {
        if (choice === 'product') {
            if (resale || stock) return true
        }
        return false
    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const addService = async () => {

        if (!checkAllInputs(choice, name, value, amount, resale, stock)) {

            Alert.alert(
                'Preencha todos os campos',
                'Todos os campos do formulário precisam ser preenchidos'
            )

            return

        }

        setLoadingScreen(true)

        const service = createNewService(choice, name, value, amount, isThereAmount(), resale)

        if (resale) {

            const newExpense = createNewOutflow(valueChoice, purchaseValue, amount, name, purchaseDate)

            try {

                const updatedExpenses = [...expenses, newExpense]
                await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses))
                setExpenses(updatedExpenses)

            } catch (err) {

                warning('Erro ao acessar banco de dados', setLoadingScreen)
                return

            }
        }

        if (!services[0] && setCategory) {
            setCategory(choice)
        }

        if (!checkServicesAmount(services, service)) {
            warning('Você só pode registrar 8 items por categoria', setLoadingScreen)
            return
        }

        if (checkIfThereIsAnotherService(services, name)) {
            warning('Um item com este nome já existe', setLoadingScreen)
            return
        }

        try {

            const updatedServices = orderServices([...services, service])
            await AsyncStorage.setItem('items', JSON.stringify(updatedServices))
            setServices(updatedServices)

        } catch (err) {

            warning('Erro ao acessar banco de dados', setLoadingScreen)
            return

        }

        setAddServiceForm(false)
        setHideTabBar(false)
        setButton(true)
        setLoadingScreen(false)

    }
    

    const getPurchaseValueText = () => {
        switch (valueChoice) {
            case 'total':
                return 'Valor de todas as unidades somadas.'
            default:
                return 'Valor de cada unidade.'
        }
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
                        {choice === 'product' && !resale && (
                            <StockButton
                                stock={stock}
                                setStock={setStock}
                            />
                        )}
                        {choice === 'product' && isThereAmount() && (
                            <AmountInput
                                text={resale ? 'Unidades' : 'Estoque Atual'}
                                setAmount={setAmount}
                                bgColor='rgba(51, 0, 102, 0.1)'
                                textColor='#330066'
                            />
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
                                <Text style={{
                                    color: 'rgba(51, 0, 102, 0.5)',
                                    fontSize: 12,
                                    marginBottom: 20,
                                    marginTop: -18 
                                }}>
                                    {getPurchaseValueText()}
                                </Text>
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
                    </FormInputs>
                    <SubmitFormButtons submit={addService} submitButtonText='Cadastrar' submitButtonColor='#330066' />
                </FormBody>
            </FormContainer>
        </>
    )

}