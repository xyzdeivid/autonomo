import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useContext, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'
import NumberInput from '../common/NumberInput'
import FormTitle from '../common/FormTitle'
import { MainDisplaysContext } from '@/context/MainDisplays'
import NameInput from '../common/NameInput'

import {
    checkIfThereIsAnotherService,
    checkServicesAmount, createNewOutflow,
    createNewService, orderServices
} from '@/functions/services'
import AmountInput from '../common/AmountInput'
import LoadingScreen from '../common/LoadingScreen'
import ResaleButton from './ResaleButton'
import DateInput from '../common/DateInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ValueOption from '../common/ValueOption'
import StockButton from './StockButton'
import React from 'react'
import { warning } from '@/functions/common'
import ItemsCategoriesForm from './ItemsCategoriesForm'
import ServiceCreationForm from './ServiceCreationForm'
import FormContainer from '../common/FormContainer'
import { db } from '@/database/db'

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
    const [choice, setChoice] = useState('')
    const [valueChoice, setValueChoice] = useState('total')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [stock, setStock] = useState(false)
    const [step, setStep] = useState(0)

    const isThereAmount = () => {
        if (choice === 'product') {
            if (resale || stock) return true
        }
        return false
    }

    const addService = async () => {

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
                setAddServiceForm(false)
                setButton(true)
                return

            }
        }

        if (!services[0] && setCategory) {
            setCategory(choice)
        }

        if (!checkServicesAmount(services, service)) {
            warning('Você só pode registrar 8 itens por categoria', setLoadingScreen)
            setAddServiceForm(false)
            setButton(true)
            return
        }

        if (checkIfThereIsAnotherService(services, name)) {
            warning('Um item com este nome já existe', setLoadingScreen)
            setAddServiceForm(false)
            setButton(true)
            return
        }

        try {

            const updatedServices = orderServices([...services, service])
            await await db.runAsync(
                `INSERT INTO items 
   (_id, category, value, isThereAmount, resale, amount)
   VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    service._id,
                    service.category,
                    service.value,
                    service.isThereAmount ? 1 : 0,
                    service.resale ? 1 : 0,
                    service.amount ?? null
                ]
            )
            setServices(updatedServices)

        } catch (err) {

            warning('Erro ao acessar banco de dados', setLoadingScreen)
            setAddServiceForm(false)
            setButton(true)
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
                return 'Valor de todas as unidades do produto somadas.'
            default:
                return 'Valor de cada unidade do produto.'
        }
    }

    const nextStep = () => {
        if (step === 0 && !choice) {
            Alert.alert('Escolha uma categoria!')
            return
        }
        if (step === 1 && choice === 'product' && resale) {
            if (!(amount && purchaseValue)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
        }
        if (step === 2 && choice === 'product' && stock) {
            if (!amount) {
                Alert.alert('Preencha todos os campos!')
                return
            }
        }
        if (step === 1 && choice === 'service') {
            if (!(name && value)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            addService()
        }
        if (step === 1 && choice === 'budget') {
            if (!name) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            addService()
        }
        if (step === 2 && resale) {
            if (!(name && value)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            addService()
        }
        if (step === 3) {
            if (!(name && value)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            addService()
        }
        setStep(step + 1)
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer>
                {
                    step === 0 && <FormTitle
                        text='Novo Produto ou Serviço'
                        textColor='#330066'
                    />
                }
                {
                    step === 0 && (
                        <ItemsCategoriesForm choice={choice} setChoice={setChoice} />
                    )
                }
                {
                    step === 1 && choice === 'service' && (
                        <ServiceCreationForm setName={setName} setValue={setValue} />
                    )
                }
                {
                    step === 1 && choice === 'budget' && (
                        <>
                            <NameInput
                                setName={setName}
                                textColor='#330066'
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                            <Text style={{ marginBottom: 20, color: '#330066' }}>
                                O valor será definido ao registrar entrada.
                            </Text>
                        </>
                    )
                }
                {
                    step === 1 && choice === 'product' && (
                        <ResaleButton
                            resale={resale}
                            setResale={setResale}
                        />
                    )
                }
                {step === 1 && resale && (
                    <>
                        <DateInput
                            setTargetDate={setPurchaseDate}
                            bgColor='#330066'
                            label='Data de Compra'
                            textColor='#330066'
                        />
                        <Text style={{
                            color: 'rgba(51, 0, 102, 0.5)',
                            fontSize: 12,
                            marginBottom: 20,
                            marginTop: -18
                        }}>
                            Data em que você comprou o produto.
                        </Text>
                        <AmountInput
                            text={resale ? 'Unidades' : 'Estoque Atual'}
                            setAmount={setAmount}
                            bgColor='rgba(51, 0, 102, 0.1)'
                            textColor='#330066'
                        />
                        <Text style={{
                            color: 'rgba(51, 0, 102, 0.5)',
                            fontSize: 12,
                            marginBottom: 20,
                            marginTop: -18
                        }}>
                            Quantas unidades do produto você comprou.
                        </Text>
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
                {step === 2 && !resale && choice === 'product' && (
                    <>
                        <StockButton
                            stock={stock}
                            setStock={setStock}
                        />
                        {
                            stock && (
                                <AmountInput
                                    text={resale ? 'Unidades' : 'Estoque Atual'}
                                    setAmount={setAmount}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    textColor='#330066'
                                />
                            )
                        }
                    </>
                )}
                {
                    step === 2 && resale && (
                        <>
                            <NameInput
                                setName={setName}
                                textColor='#330066'
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                            {choice !== 'budget' && (
                                <NumberInput
                                    setValue={setValue}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    textColor='#330066'
                                    label={choice === 'product' ? 'Valor de Venda (un)' : ''}
                                />
                            )}
                        </>
                    )
                }
                {
                    step === 3 && (
                        <>
                            <NameInput
                                setName={setName}
                                textColor='#330066'
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                            {choice !== 'budget' && (
                                <NumberInput
                                    setValue={setValue}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    textColor='#330066'
                                    label={choice === 'product' ? 'Valor de Venda (un)' : ''}
                                />
                            )}
                        </>
                    )
                }
            </FormContainer>
            <View style={styles.submitButtons}>
                <View>
                    <Button onPress={() => {
                        setAddServiceForm(false)
                        setButton(true)
                    }} title='Cancelar' color='gray' />
                </View>
                <View>
                    <Button onPress={() => nextStep()} title='Próximo' color='#330066' />
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 8
    },

    title: {
        fontSize: 20,
        marginBottom: 16,
        color: '#330066'
    },

    submitButtons: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    }


})