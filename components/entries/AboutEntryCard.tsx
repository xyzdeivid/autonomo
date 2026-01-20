import { Alert, BackHandler, Platform } from 'react-native'
import { Entry } from '@/types'
import { dateFormat, getErrorMessage, moneyFormat } from '@/utils/common'
import React, { useEffect, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import AddClienteButton from './AddClienteButton'
import useEditEntryDate from '@/hooks/useEditEntryDate'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { DeleteListItemButton } from '../common/DeleteListItemButton'
import { colors } from '@/constants/appColors'
import { ListItemCardContainer } from '../common/ListItemCardContainer'
import { ListItemCardHeader } from '../common/ListItemCardHeader'
import { ListItemCardBody } from '../common/ListItemCardBody'
import { parseISO } from 'date-fns'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { EditNameCard } from '../common/EditNameCard'
import useEditCustomerName from '@/hooks/useEditCustomerName'
import { EditAmountCard } from '../common/EditAmountCard'
import useEditEntryAmount from '@/hooks/useEditEntryAmount'

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff }: AboutSchedulingCardProps) {

    const [showDateTimePicker, setShowDateTimePicker] = useState(false)
    const [showEditNameCard, setShowEditNameCard] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [showEditAmountCard, setShowEditAmountCard] = useState(false)

    const editCustomerName = useEditCustomerName().editCustomerName
    const editEntryDate = useEditEntryDate().editEntryDate
    const editEntryAmount = useEditEntryAmount().editEntryAmount

    const formatDateToISO = (date: Date) => {
        return date.toISOString().split('T')[0]
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const submitCustomerName = async (customer: string) => {

        setLoadingPage(true)

        const result = await editCustomerName(scheduling._id, customer)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setLoadingPage(false)
        setShowEditNameCard(false)

    }

    const submitDate = async (newDate: string) => {

        setLoadingPage(true)

        const result = await editEntryDate(newDate, scheduling._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setLoadingPage(false)

    }

    const submitAmount = async (newAmount: number) => {

        setLoadingPage(true)

        const result = await editEntryAmount(newAmount, scheduling)

        if (!result.success && result.error) {
            Alert.alert('Erro', getErrorMessage(result.error))
        }

        setLoadingPage(false)
        setShowEditAmountCard(false)

    }

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {

        setShowDateTimePicker(false)

        if (event.type === 'set' && selectedDate) {

            const dateString = formatDateToISO(selectedDate)

            if (dateString !== scheduling.date) {

                submitDate(dateString)

            }

        }

    }

    return (
        <>
            {loadingPage && <LoadingScreen />}
            <ListItemCardContainer
                bgColor={colors.entries.min}
                setShowCard={setFormOff}
            >
                <ListItemCardHeader
                    text='Detalhes de Receita'
                    bgColor={colors.entries.max}
                    onCloseCardButton={() => setFormOff(false)}
                />
                <ListItemCardBody>
                    {scheduling.customer
                        ? <ListItemCardProperty
                            label='Cliente'
                            text={scheduling.customer}
                            bgColor={colors.entries.min}
                            onEditButtonPress={() => setShowEditNameCard(true)}
                        />
                        : <AddClienteButton
                            addCustomer={customer => submitCustomerName(customer)}
                        />
                    }
                    {
                        showEditNameCard && scheduling.customer && (
                            <EditNameCard
                                visible={showEditNameCard}
                                currentName={scheduling.customer}
                                onConfirmButtonPress={customer => submitCustomerName(customer)}
                                onCancelButtonPress={() => setShowEditNameCard(false)}
                            />

                        )
                    }
                    <ListItemCardProperty
                        label='Produto/Serviço'
                        text={scheduling.serviceId}
                        bgColor={colors.entries.min}
                    />
                    <ListItemCardProperty
                        label='Data'
                        text={dateFormat(scheduling.date)}
                        bgColor={colors.entries.min}
                        onEditButtonPress={() => setShowDateTimePicker(true)}
                    />
                    {showDateTimePicker && (
                        <DateTimePicker
                            value={parseISO(scheduling.date)}
                            mode='date'
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                        />
                    )}
                    <ListItemCardProperty
                        label='Valor'
                        text={moneyFormat(scheduling.serviceValue)}
                        bgColor={colors.entries.min}
                    />
                    {
                        (scheduling.serviceAmount && scheduling.serviceCategory === 'product') ? (
                            <>
                                <ListItemCardProperty
                                    label='Valor (un)'
                                    text={moneyFormat(scheduling.serviceValue / scheduling.serviceAmount)}
                                    bgColor={colors.entries.min}
                                />
                                <ListItemCardProperty
                                    label='Quantidade'
                                    text={String(scheduling.serviceAmount)}
                                    bgColor={colors.entries.min}
                                    onEditButtonPress={() => setShowEditAmountCard(true)}
                                />
                            </>
                        ) : null
                    }
                    {
                        showEditAmountCard && scheduling.serviceAmount && (
                            <EditAmountCard
                                visible={showEditAmountCard}
                                currentValue={scheduling.serviceAmount}
                                onSuccessButtonPress={newAmount => submitAmount(Number(newAmount))}
                                onCancelButtonPress={() => setShowEditAmountCard(false)}
                            />
                        )
                    }
                    <DeleteListItemButton onPress={() => setConfirmDelete(true)} />
                </ListItemCardBody>
            </ListItemCardContainer>
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