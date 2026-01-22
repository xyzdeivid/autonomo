// react & react rative
import React, { useEffect, useState } from 'react'
import { BackHandler, Platform } from 'react-native'

// libs externas
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { parseISO } from 'date-fns'

// arquivos globais
import { Entry } from '@/types'
import { dateFormat, formatDateToISO, moneyFormat, showErrorAtSubmitData } from '@/utils/common'

// hooks
import useEditCustomerName from '@/hooks/useEditCustomerName'
import useEditEntryAmount from '@/hooks/useEditEntryAmount'
import useEditEntryDate from '@/hooks/useEditEntryDate'

// componentes genéricos
import LoadingScreen from '@/components/common/LoadingScreen'
import { ListItemCardContainer } from '@/components/common/ListItemCardContainer'
import { ListItemCardBody } from '@/components/common/ListItemCardBody'
import { ListItemCardProperty } from '@/components/common/ListItemCardProperty'
import { EditNameCard } from '@/components/common/EditNameCard'
import { EditAmountCard } from '@/components/common/EditAmountCard'
import { DeleteListItemButton } from '@/components/common/DeleteListItemButton'
import ConfirmDelete from '@/components/common/ConfirmDelete'

// componentes da tela
import AddClienteButton from './AddClienteButton'

// estilos
import { colors } from '@/styles/appColors'

interface AboutSchedulingCardProps {
    scheduling: Entry
    deleteFunction: (scheduling: Entry) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutSchedulingCard({ scheduling, deleteFunction, setFormOff }: AboutSchedulingCardProps) {

    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)
    const [showEditNameCard, setShowEditNameCard] = useState(false)
    const [showConfirmDeleteCard, setShowConfirmDeleteCard] = useState(false)
    const [showEditAmountCard, setShowEditAmountCard] = useState(false)

    const editCustomerName = useEditCustomerName().editCustomerName
    const editEntryDate = useEditEntryDate().editEntryDate
    const editEntryAmount = useEditEntryAmount().editEntryAmount

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const submitCustomerName = async (customer: string) => {

        setShowLoadingScreen(true)

        const result = await editCustomerName(scheduling._id, customer)

        if (!result.success) showErrorAtSubmitData(result.error)

        setShowLoadingScreen(false)
        setShowEditNameCard(false)

    }

    const submitDate = async (newDate: string) => {

        setShowLoadingScreen(true)

        const result = await editEntryDate(newDate, scheduling._id)

        if (!result.success) showErrorAtSubmitData(result.error)

        setShowLoadingScreen(false)

    }

    const submitAmount = async (newAmount: number) => {

        setShowLoadingScreen(true)

        const result = await editEntryAmount(newAmount, scheduling)

        if (!result.success) showErrorAtSubmitData(result.error)

        setShowLoadingScreen(false)
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
            {showLoadingScreen && <LoadingScreen />}
            <ListItemCardContainer
                bgColor={colors.entries.midMin}
                setShowCard={setFormOff}
            >
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
                    <DeleteListItemButton onPress={() => setShowConfirmDeleteCard(true)} />
                </ListItemCardBody>
            </ListItemCardContainer>
            {
                showConfirmDeleteCard && (
                    <ConfirmDelete
                        name={scheduling.serviceId}
                        deleteFunction={() => {
                            deleteFunction(scheduling)
                        }}
                        setConfirmDelete={setShowConfirmDeleteCard}
                    />
                )
            }
        </>
    )

}