import { View, Text, StyleSheet, Alert, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Item } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import { orderServices } from '@/functions/services'
import EditValueInput from './EditValueInput'
import ActualValue from './ActualValue'
import ActualStock from './ActualStock'
import EditStockInput from './EditStockInput'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import ActualName from './ActualName'
import EditNameInput from './EditNameInput'
import { moneyFormat } from '@/functions/common'
import React from 'react'
import { db } from '@/database/db'

interface AboutServiceCardProps {
    service: Item
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutServiceCard({ service, deleteFunction, setFormOff, setButton }: AboutServiceCardProps) {

    const [services, setServices] = useContext(DocsContext).items

    const serviceName = service._id

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    const [editNameInput, setEditNameInput] = useState(false)
    const [name, setName] = useState('')

    const [editValueInput, setEditValueInput] = useState(false)
    const [value, setValue] = useState(0)

    const [editStockInput, setEditStockInput] = useState(false)
    const [stock, setStock] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [changedValue, setChangedValue] = useState(false)

    useEffect(() => {
        setButton(false)
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            setButton(true)
            return null
        })
    }, [])

    const editName = async () => {

        if (name) {

            setLoadingScreen(true)

            const remainingItems = services.filter(current => {
                return current._id !== service._id
            })

            const editedItem = service
            editedItem._id = name

            let editedItems = [] as Item[]

            if (remainingItems[0]) {

                editedItems = [...remainingItems, editedItem]

            } else {

                editedItems = [editedItem]

            }

            try {

                await db.runAsync(
                    `UPDATE items
                    SET _id = ?
                    WHERE _id = ?`,
                    [name, serviceName]
                )
                setServices(orderServices(editedItems))

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

            setFormOff(false)
            setButton(true)
            setHideTabBar(false)

        } else {

            setEditNameInput(false)

        }

    }

    const editValue = async () => {

        if (value) {

            setLoadingScreen(true)

            const remainingServices = services.filter(current => {
                return current._id !== service._id
            })

            const editedService: Item = {
                category: service.category,
                _id: service._id,
                value: value,
                isThereAmount: service.isThereAmount,
                resale: service.resale
            }

            if (editedService.isThereAmount)
                editedService.amount = service.amount

            let editedItems = [] as Item[]

            if (remainingServices[0]) {

                editedItems = orderServices([...remainingServices, editedService])

            } else {

                editedItems = [editedService]

            }

            try {

                await db.runAsync(
                    `UPDATE items
                    SET value = ?
                    WHERE _id = ?`,
                    [value ?? 0, serviceName]
                )
                setServices(editedItems)

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

            setFormOff(false)
            setButton(true)
            setHideTabBar(false)

        } else {

            setEditValueInput(false)

        }

    }

    const editStock = async () => {

        if (changedValue) {

            setLoadingScreen(true)

            const remainingServices = services.filter(current => {
                return current._id !== service._id
            })

            const editedService: Item = {
                category: service.category,
                _id: service._id,
                value: service.value,
                isThereAmount: true,
                resale: service.resale,
                amount: stock
            }

            let editedItems = [] as Item[]

            if (remainingServices[0]) {

                editedItems = orderServices([...remainingServices, editedService])

            } else {

                editedItems = [editedService]

            }

            try {

                await db.runAsync(
                    `UPDATE items
                    SET amount = ?
                    WHERE _id = ?`,
                    [stock ?? 0, serviceName]
                )
                setServices(editedItems)

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

            setFormOff(false)
            setButton(true)
            setHideTabBar(false)

        } else {

            setEditStockInput(false)

        }

    }

    const getTitle = (item: Item) => {

        switch (item.category) {

            case 'product':
                return 'Produto'

            case 'service':
                return 'Serviço'

            case 'budget':
                return 'Orçamentário'

        }
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle text={`Informações do ${getTitle(service)}`} textColor='#330066' />
                <View>
                    {
                        editNameInput
                            ? <EditNameInput setName={setName} editName={editName} actualName={service._id} />
                            : <ActualName name={name || service._id} setEditNameInput={setEditNameInput} />
                    }
                    {service.category !== 'budget' && (
                        <View style={styles.inputContainer}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Valor:</Text>
                                {
                                    editValueInput
                                        ? <>
                                            <EditValueInput
                                                setValue={setValue}
                                                editValue={editValue}
                                            />
                                        </>
                                        : <ActualValue
                                            value={value || service.value}
                                            setEditValueInput={setEditValueInput}
                                        />
                                }
                            </View>
                            {
                                editValueInput &&
                                <Text style={styles.currentValueText}>
                                    Valor atual: {moneyFormat(service.value)}
                                </Text>
                            }
                        </View>
                    )}
                    {
                        service.isThereAmount && (
                            <View style={styles.inputContainer}>
                                <View style={styles.infoContainer}>
                                    {
                                        editStockInput
                                            ? <EditStockInput
                                                setStock={setStock}
                                                editStock={editStock}
                                                setChangedValue={setChangedValue}
                                                currentStock={service.amount}
                                            />
                                            : <ActualStock stock={stock || service.amount || 0} setEditStockInput={setEditStockInput} />
                                    }
                                </View>
                            </View>
                        )
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
                    name={service._id}
                        deleteFunction={() => {
                            deleteFunction(service._id)
                        }}
                        setConfirmDelete={setConfirmDelete}
                    />
            }
        </>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 12
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    },
    currentValueText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2
    }
})