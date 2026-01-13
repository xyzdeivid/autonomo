import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext } from '@/context/DocsContext'
import { Entry } from '@/types'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import ConfirmDelete from '../common/ConfirmDelete'
import ActualAmount from './ActualAmount'
import LoadingScreen from '../common/LoadingScreen'
import AddClienteButton from './AddClienteButton'
import ActualCustomer from './ActualCustomer'
import ActualDate from './ActualDate'
import { db } from '@/database/db'
import useAddCustomerName from '@/hooks/useAddCustomerName'
import useEditCustomerName from '@/hooks/useEditCustomerName'

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff, setButton }: AboutSchedulingCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)
    const appDocs = useContext(DocsContext)
    const [entries, setEntries] = appDocs.entries
    const remainingEntries = entries.filter(current => (
        current._id !== scheduling._id
    ))
    const [loadingPage, setLoadingPage] = useState(false)
    const [customer, setCustomer] = useState('')
    const [newDate, setNewDate] = useState('')

    const addCustomerName = useAddCustomerName().addCustomerName
    const editCustomerName = useEditCustomerName().editCustomerName

    useEffect(() => {
        setButton(false)
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            setButton(true)
            return null
        })
    }, [setButton, setFormOff])

    const submitCustomerName = async () => {

        setLoadingPage(true)

        await addCustomerName(scheduling._id, customer)

        setLoadingPage(false)
        setHideTabBar(false)
        setButton(true)
        setFormOff(false)

    }

    const submitCustomerNameToEdit = async () => {

        setLoadingPage(true)

        await editCustomerName(scheduling._id, customer)

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

                await db.runAsync(
                `UPDATE entries
                SET date = ?
                WHERE _id = ?`,
                [newDate, scheduling._id]
            )
                setEntries([...remainingEntries, scheduling])

            } catch {

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
                                editCustomerName={submitCustomerNameToEdit}
                            />
                            : <AddClienteButton
                                setCustomer={setCustomer}
                                customer={customer}
                                addCustomer={submitCustomerName}
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
                                        <ActualAmount
                                            amount={scheduling.serviceAmount}
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