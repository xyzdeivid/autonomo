import { View, Text, StyleSheet, Alert } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Scheduling, Service } from '@/context/DocsContext'
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
import { orderExpenses } from '@/functions/expenses'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { moneyFormat } from '@/functions/common'

interface AboutServiceCardProps {
    service: Service
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutServiceCard({ service, deleteFunction, setFormOff, setButton }: AboutServiceCardProps) {

    const [services, setServices] = useContext(DocsContext).services
    const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
    const [expenses, setExpenses] = useContext(DocsContext).expenses

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
        setHideTabBar(true)
        setButton(false)
    }, [])

    const editName = async () => {

        if (name) {

            setLoadingScreen(true)

            const remainingItems = services.filter(current => {
                return current._id !== service._id
            })

            const editedItem = service
            editedItem._id = name

            const expensesToEdit = expenses.filter(expense => {
                return expense.name === serviceName
            })

            const remainingExpenses = expenses.filter(expense => {
                return expense.name !== serviceName
            })

            expensesToEdit.forEach(expense =>
                expense.name = name
            )

            const editedExpenses = [...expensesToEdit]

            if (remainingExpenses[0]) {

                editedExpenses.push(...remainingExpenses)

            }

            try {

                await AsyncStorage.setItem('expenses', JSON.stringify(editedExpenses))
                setExpenses(orderExpenses(editedExpenses))

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')
                return

            }

            const schedulingsToEdit = schedulings.filter(current => {
                return current.service._id === serviceName
            })

            const remainingSchedulings = schedulings.filter(current => {
                return current.service._id !== serviceName
            })

            schedulingsToEdit.forEach(current =>
                current.service._id = name
            )

            let editedSchedulings = [] as Scheduling[]

            if (remainingSchedulings[0]) {

                editedSchedulings = [...remainingSchedulings, ...schedulingsToEdit]

            } else {

                editedSchedulings = schedulingsToEdit

            }

            try {

                await AsyncStorage.setItem('schedulings', JSON.stringify(editedSchedulings))
                setSchedulings(editedSchedulings)

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')
                return

            }

            let editedItems = [] as Service[]

            if (remainingItems[0]) {


                editedItems = [...remainingItems, editedItem]



            } else {

                editedItems = [editedItem]

            }

            try {

                await AsyncStorage.setItem('items', JSON.stringify(editedItems))
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

            const editedService: Service = {
                category: service.category,
                _id: service._id,
                value: value,
                isThereAmount: service.isThereAmount,
                resale: service.resale
            }

            if (editedService.isThereAmount)
                editedService.amount = service.amount

            let editedItems = [] as Service[]

            if (remainingServices[0]) {

                editedItems = orderServices([...remainingServices, editedService])

            } else {

                editedItems = [editedService]

            }

            try {

                await AsyncStorage.setItem('items', JSON.stringify(editedItems))
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

            const editedService: Service = {
                category: service.category,
                _id: service._id,
                value: service.value,
                isThereAmount: true,
                resale: service.resale,
                amount: stock
            }

            let editedItems = [] as Service[]

            if (remainingServices[0]) {

                editedItems = orderServices([...remainingServices, editedService])

            } else {

                editedItems = [editedService]

            }

            try {

                await AsyncStorage.setItem('items', JSON.stringify(editedItems))
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

    const getTitle = (item: Service) => {

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
                setFormOff={setFormOff}
                setButton={setButton}
                bgColor='rgba(51, 0, 102, 0.1)'
            >
                <FormBody borderColor='rgba(51, 0, 102, 0.1)'>
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
                    {
                        !confirmDelete
                            ? <SubmitFormButtons
                                submit={() => setConfirmDelete(true)}
                                submitButtonText='Excluir'
                                submitButtonColor='darkred'
                            />
                            : <ConfirmDelete
                                deleteFunction={() => {
                                    deleteFunction(service._id)
                                }}
                                setConfirmDelete={setConfirmDelete}
                            />
                    }
                </FormBody>
            </FormContainer>
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
        fontWeight: 'bold'
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