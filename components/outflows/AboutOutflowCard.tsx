import { Text, StyleSheet, BackHandler, Platform, Alert } from 'react-native'
import { Outflow } from '@/types'
import { dateFormat, getErrorMessage, moneyFormat } from '@/utils/common'
import React, { useEffect, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import useEditOutflowName from '@/hooks/outflows/useEditOutflowName'
import useEditOutflowValue from '@/hooks/outflows/useEditOutflowValue'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { DeleteListItemButton } from '../common/DeleteListItemButton'
import useEditOutflowDate from '@/hooks/outflows/useEditOutflowDate'
import { colors } from '@/styles/appColors'
import { ListItemCardContainer } from '../common/ListItemCardContainer'
import { ListItemCardBody } from '../common/ListItemCardBody'
import { EditNameCard } from '../common/EditNameCard'
import { parseISO } from 'date-fns'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { EditValueCard } from '../common/EditValueCard'
import { CardFooter } from '../common/CardFooter'
import { CloseCardButton } from '../common/CloseCardButton'


interface AboutOutflowCardProps {
    outflow: Outflow
    deleteFunction: (expense: Outflow) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutOutflowCard({ outflow, deleteFunction, setFormOff }: AboutOutflowCardProps) {

    const [showDateTimePicker, setShowDateTimePicker] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showEditValueCard, setShowEditValueCard] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [showEditNameCard, setShowEditNameCard] = useState(false)

    const editOutflowName = useEditOutflowName().editOutflowName
    const editOutflowValue = useEditOutflowValue().editOutflowValue
    const editOutflowDate = useEditOutflowDate().editOutflowDate

    const formatDateToISO = (date: Date) => {
        return date.toISOString().split('T')[0]
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const submitNameToEdit = async (newName: string) => {

        setLoadingScreen(true)

        const result = await editOutflowName(newName, outflow._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setLoadingScreen(false)
        setShowEditNameCard(false)

    }

    const submitDateToEdit = async (newDate: string) => {

        setLoadingScreen(true)

        const result = await editOutflowDate(newDate, outflow._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setLoadingScreen(false)

    }

    const submitValueToEdit = async (newValue: number) => {

        setLoadingScreen(true)

        const result = await editOutflowValue(newValue, outflow._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setLoadingScreen(false)
        setShowEditValueCard(false)

    }

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {

        setShowDateTimePicker(false)

        if (event.type === 'set' && selectedDate) {

            const dateString = formatDateToISO(selectedDate)

            if (dateString !== outflow.date) {

                submitDateToEdit(dateString)

            }

        }

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <ListItemCardContainer
                bgColor={colors.outflows.midMin}
                setShowCard={setFormOff}
            >
                <ListItemCardBody>
                    {
                        outflow.amount && (
                            <Text style={styles.replenishLabel}>Reposição de Estoque</Text>
                        )
                    }
                    <ListItemCardProperty
                        label='Nome'
                        text={outflow.name}
                        // Só permitindo edição se não for uma revenda
                        onEditButtonPress={!outflow.amount ? () => {
                            setShowEditNameCard(true)
                        } : undefined}
                        bgColor={colors.outflows.min}
                    />
                    {
                        showEditNameCard && (
                            <EditNameCard
                                visible={showEditNameCard}
                                currentName={outflow.name}
                                onConfirmButtonPress={newName => submitNameToEdit(newName)}
                                onCancelButtonPress={() => setShowEditNameCard(false)}
                            />
                        )
                    }
                    <ListItemCardProperty
                        label='Data'
                        text={dateFormat(outflow.date)}
                        bgColor={colors.outflows.min}
                        onEditButtonPress={() => setShowDateTimePicker(true)}
                    />
                    {showDateTimePicker && (
                        <DateTimePicker
                            value={parseISO(outflow.date)}
                            mode='date'
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                        />
                    )}
                    <ListItemCardProperty
                        label='Valor'
                        text={moneyFormat(outflow.value)}
                        bgColor={colors.outflows.min}
                        onEditButtonPress={!outflow.amount ? () => setShowEditValueCard(true)
                            : undefined
                        }
                    />
                    {showEditValueCard && (
                        <EditValueCard
                            visible={showEditValueCard}
                            currentValue={outflow.value}
                            onSuccessButtonPress={newValue => submitValueToEdit(newValue)}
                            onCancelButtonPress={() => setShowEditValueCard(false)}
                        />
                    )}
                    {
                        outflow.amount && (
                            <>
                                <ListItemCardProperty
                                    label='Valor (un)'
                                    text={moneyFormat(outflow.value / outflow.amount)}
                                    bgColor={colors.outflows.min}
                                />
                                <ListItemCardProperty
                                    label='Quantidade'
                                    text={String(outflow.amount)}
                                    bgColor={colors.outflows.min}
                                />
                            </>
                        )
                    }
                    <CardFooter>
                        <CloseCardButton onPress={() => setFormOff(false)} />
                        <DeleteListItemButton onPress={() => setConfirmDelete(true)} />
                    </CardFooter>
                </ListItemCardBody>
            </ListItemCardContainer>
            {
                confirmDelete &&
                <ConfirmDelete
                    name={outflow.name}
                    deleteFunction={() => {
                        deleteFunction(outflow)
                    }}
                    setConfirmDelete={setConfirmDelete}
                />
            }
        </>
    )

}

const styles = StyleSheet.create({

    replenishLabel: {
        fontSize: 16,
        color: colors.outflows.max,
        fontWeight: 'bold',
        marginBottom: 24
    },

    labelContainer: {
        marginBottom: 12,
        fontSize: 16
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16
    }

})