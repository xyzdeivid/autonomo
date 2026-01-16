import { View, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Entry } from '@/types'
import { moneyFormat } from '@/functions/common'
import { useEffect, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import AddClienteButton from './AddClienteButton'
import ActualCustomer from './ActualCustomer'
import useAddCustomerName from '@/hooks/useAddCustomerName'
import useEditCustomerName from '@/hooks/useEditCustomerName'
import useEditEntryDate from '@/hooks/useEditEntryDate'
import { EditableProperty } from '../common/EditableProperty'
import { EditDateField } from '../common/EditDateField'
import { DeleteButton } from '../common/DeleteButton'

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff }: AboutSchedulingCardProps) {

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [customer, setCustomer] = useState('')

    const [showEditCustomerInput, setShowEditCustomerInput] = useState(false)

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
        setShowEditCustomerInput(false)

    }

    const editDate = async (newDate: string) => {

        setLoadingPage(true)

        await editEntryDate(newDate, scheduling._id)

        setLoadingPage(false)

    }

    return (
        <>
            {loadingPage && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle
                    text='Informações de Receita'
                    onCloseFormButtonPress={() => setFormOff(false)}
                    textColor='#006600'
                />
                <View>
                    {
                        scheduling.customer
                            ? <ActualCustomer
                                customer={scheduling.customer}
                                setNewCustomerName={setCustomer}
                                newCustomerName={customer}
                                editCustomerName={submitCustomerNameToEdit}
                                showEditInput={showEditCustomerInput}
                                setShowEditInput={setShowEditCustomerInput}
                            />
                            : <AddClienteButton
                                setCustomer={setCustomer}
                                customer={customer}
                                addCustomer={submitCustomerName}
                            />
                    }
                    <EditableProperty
                        label='Produto/Serviço: '
                        propertyName={scheduling.serviceId}
                        isEditable={false}
                    />
                    <EditDateField
                        defaultValue={scheduling.date}
                        editDate={editDate}
                    />
                    <EditableProperty
                        label='Valor: '
                        propertyName={moneyFormat(scheduling.serviceValue)}
                        isEditable={false}
                    />
                    {
                        (scheduling.serviceAmount && scheduling.serviceCategory === 'product') ? (
                            <>
                                <EditableProperty
                                    label='Valor (un): '
                                    propertyName={moneyFormat(scheduling.serviceValue / scheduling.serviceAmount)}
                                    isEditable={false}
                                />
                                <EditableProperty
                                    label='Quantidade: '
                                    propertyName={String(scheduling.serviceAmount)}
                                    isEditable={false}
                                />
                            </>
                        ) : null
                    }
                </View>
            </FormContainer>
            <DeleteButton onPress={() => setConfirmDelete(true)} />
            {
                confirmDelete && (
                    <ConfirmDelete
                        name={scheduling.serviceId}
                        deleteFunction={() => {
                            deleteFunction(scheduling)
                        }}
                        setConfirmDelete={setConfirmDelete}
                    />
                )
            }
        </>
    )

}