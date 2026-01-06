import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Entry } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import ConfirmDelete from '../common/ConfirmDelete'
import ActualAmount from './ActualAmount'
import EditAmountInput from './EditAmountInput'
import LoadingScreen from '../common/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { orderServices } from '@/functions/services'
import AddClienteButton from './AddClienteButton'
import ActualCustomer from './ActualCustomer'
import ActualDate from './ActualDate'
import React from 'react'

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff, setButton }: AboutSchedulingCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showEditAmountInput, setShowEditAmountInput] = useState(false)
    const [newAmount, setNewAmount] = useState(0)
    const isThereAmount = scheduling.serviceIsThereAmount
    const appDocs = useContext(DocsContext)
    const [entries, setEntries] = appDocs.entries
    const [items, setItems] = appDocs.items
    const product = items.find(current => current._id === scheduling.serviceId)
    const remainingEntries = entries.filter(current => (
        current._id !== scheduling._id
    ))
    const [loadingPage, setLoadingPage] = useState(false)
    const [customer, setCustomer] = useState('')
    const [newDate, setNewDate] = useState('')

    useEffect(() => {
        setButton(false)
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            setButton(true)
            return null
        })
    }, [])

    const editAmount = async () => {

        setLoadingPage(true)

        if (scheduling.serviceAmount) {

            let currentProductStock = product?.amount || 0

            // Atualizando estoque no itens
            if (isThereAmount) {

                currentProductStock += scheduling.serviceAmount
                currentProductStock = currentProductStock - newAmount

                if (currentProductStock >= 0) {

                    if (product) {

                        product.amount = currentProductStock
                        const remainingItems = items.filter(current => current._id !== product._id)

                        try {

                            await AsyncStorage.setItem('items', JSON.stringify([...remainingItems, product]))
                            setItems(orderServices([...remainingItems, product]))

                        } catch (err) {

                            Alert.alert('Erro ao acessar banco de dados')
                            return

                        }

                        scheduling.serviceValue =
                            (scheduling.serviceValue / scheduling.serviceAmount) * newAmount

                        scheduling.serviceAmount = newAmount

                    }

                } else {

                    Alert.alert('Estoque insuficiente')

                }

            } else {

                scheduling.serviceValue =
                    (scheduling.serviceValue / scheduling.serviceAmount) * newAmount

                scheduling.serviceAmount = newAmount

            }

            try {

                await AsyncStorage.setItem('schedulings', JSON.stringify([...remainingEntries, scheduling]))
                setEntries([...remainingEntries, scheduling])

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

            setLoadingPage(false)
            setHideTabBar(false)
            setButton(true)
            setFormOff(false)

        }

    }

    const addCustomer = async () => {

        setLoadingPage(true)

        scheduling.customer = customer

        try {

            await AsyncStorage.setItem('schedulings', JSON.stringify([...remainingEntries, scheduling]))
            setEntries([...remainingEntries, scheduling])

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

        setLoadingPage(false)
        setHideTabBar(false)
        setButton(true)
        setFormOff(false)

    }

    const editCustomerName = async () => {

        setLoadingPage(true)

        scheduling.customer = customer

        try {

            await AsyncStorage.setItem('schedulings', JSON.stringify([...remainingEntries, scheduling]))
            setEntries([...remainingEntries, scheduling])

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

        setLoadingPage(false)
        setHideTabBar(false)
        setButton(true)
        setFormOff(false)

    }

    const getCurrentDate = () => {
        const year = new Date().getFullYear()
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const day = String(new Date().getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const editDate = async () => {

        const currentDate = new Date(getCurrentDate())
        const entryDate = new Date(newDate)

        if (entryDate <= currentDate) {

            setLoadingPage(true)

            scheduling.date = newDate

            try {

                await AsyncStorage.setItem('schedulings', JSON.stringify([...remainingEntries, scheduling]))
                setEntries([...remainingEntries, scheduling])

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        } else {

            Alert.alert('Não é possivel registrar entradas em datas futuras')

        }

        setLoadingPage(false)
        setHideTabBar(false)
        setButton(true)
        setFormOff(false)

    }

    return (
        <>
            {loadingPage && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle text='Informações de Receita' textColor='#006600' />
                <View>
                    {
                        scheduling.customer
                            ? <ActualCustomer
                                customer={scheduling.customer}
                                setNewCustomerName={setCustomer}
                                newCustomerName={customer}
                                editCustomerName={editCustomerName}
                            />
                            : <AddClienteButton
                                setCustomer={setCustomer}
                                customer={customer}
                                addCustomer={addCustomer}
                            />
                    }
                    <Text style={styles.labelContainer}><Text style={styles.label}>Produto/Serviço:</Text> {scheduling.serviceId}</Text>
                    <ActualDate
                        date={dateFormat(scheduling.date)}
                        setNewDate={setNewDate}
                        editDate={editDate}
                    />
                    <Text style={styles.labelContainer}><Text style={styles.label}>Valor:</Text>{moneyFormat(scheduling.serviceValue)}</Text>
                    {
                        scheduling.serviceCategory === 'product'
                            ? <View>
                                <Text style={styles.labelContainer}>
                                    <Text style={styles.label}>
                                        Valor (un):
                                    </Text>
                                    {scheduling.serviceAmount
                                        ? moneyFormat(scheduling.serviceValue / scheduling.serviceAmount)
                                        : null}
                                </Text>
                                {
                                    scheduling.serviceAmount && (
                                        showEditAmountInput
                                            ? <EditAmountInput
                                                actualAmount={scheduling.serviceAmount}
                                                newAmount={newAmount}
                                                setNewAmount={setNewAmount}
                                                setShowEditAmountInput={setShowEditAmountInput}
                                                editAmount={editAmount}
                                            />
                                            : <ActualAmount
                                                amount={scheduling.serviceAmount}
                                                setShowEditAmountInput={setShowEditAmountInput}
                                            />
                                    )
                                }
                            </View>
                            : null
                    }
                </View>
            </FormContainer>
            {
                !confirmDelete
                    ? <SubmitFormButtons
                        cancel={() => {
                            setFormOff(false)
                            setButton(true)
                        }}
                        submit={() => setConfirmDelete(true)}
                        submitButtonText='Excluir'
                        submitButtonColor='darkred'
                    />
                    : <ConfirmDelete
                    name={scheduling.serviceId}
                        deleteFunction={() => {
                            deleteFunction(scheduling)
                        }}
                        setConfirmDelete={setConfirmDelete}
                    />
            }
        </>
    )

}

const styles = StyleSheet.create({
    labelContainer: {
        marginBottom: 12,
        fontSize: 16
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    }
})