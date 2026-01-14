import { View, Text, StyleSheet, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Entry } from '@/types'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useEffect, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import ActualAmount from './ActualAmount'
import LoadingScreen from '../common/LoadingScreen'
import AddClienteButton from './AddClienteButton'
import ActualCustomer from './ActualCustomer'
import ActualDate from './ActualDate'
import useAddCustomerName from '@/hooks/useAddCustomerName'
import useEditCustomerName from '@/hooks/useEditCustomerName'
import useEditEntryDate from '@/hooks/useEditEntryDate'

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff }: AboutSchedulingCardProps) {

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [customer, setCustomer] = useState('')
    const [newDate, setNewDate] = useState('')

    const addCustomerName = useAddCustomerName().addCustomerName
    const editCustomerName = useEditCustomerName().editCustomerName
    const editEntryDate = useEditEntryDate().editEntryDate

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const submitCustomerName = async () => {

        setLoadingPage(true)

        await addCustomerName(scheduling._id, customer)

        setLoadingPage(false)
        setFormOff(false)

    }

    const submitCustomerNameToEdit = async () => {

        setLoadingPage(true)

        await editCustomerName(scheduling._id, customer)

        setLoadingPage(false)
        setFormOff(false)

    }

    const editDate = async () => {

        setLoadingPage(true)

        await editEntryDate(newDate, scheduling._id)

        setLoadingPage(false)
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