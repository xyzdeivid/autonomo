import { View, Text, StyleSheet, Alert } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { DocsContext, Expense } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import ConfirmDelete from '../common/ConfirmDelete'
import ActualName from './ActualName'
import EditNameInput from './EditNameInput'
import LoadingScreen from '../common/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActualValue from './ActualValue'
import EditValueInput from './EditValueInput'

interface AboutExpenseCardProps {
    expense: Expense
    deleteFunction: (expense: Expense) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutExpenseCard({ expense, deleteFunction, setFormOff, setButton }: AboutExpenseCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showEditNameInput, setShowEditNameInput] = useState(false)
    const [showEditValueInput, setShowEditValueInput] = useState(false)
    const [newName, setNewName] = useState('')
    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [newValue, setNewValue] = useState(0)

    useEffect(() => {
        setHideTabBar(true)
        setButton(false)
    }, [])

    const editName = async () => {

        if (newName) {

            setLoadingScreen(true)

            expense.name = newName

            const remainingExpenses = expenses.filter(current => {
                return current._id !== expense._id
            })

            try {

                await AsyncStorage.setItem('expenses', JSON.stringify([...remainingExpenses, expense]))
                setExpenses([...remainingExpenses, expense])
                setLoadingScreen(false)
                setHideTabBar(false)
                setButton(true)
                setFormOff(false)

            } catch (error) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        } else {

            setShowEditNameInput(false)

        }

    }

    const editValue = async () => {

        if (newValue) {

            setLoadingScreen(true)

            expense.value = newValue

            const remainingExpenses = expenses.filter(current => {
                return current._id !== expense._id
            })

            try {

                await AsyncStorage.setItem('expenses', JSON.stringify([...remainingExpenses, expense]))
                setExpenses([...remainingExpenses, expense])
                setLoadingScreen(false)
                setHideTabBar(false)
                setButton(true)
                setFormOff(false)

            } catch (error) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        } else {

            setShowEditValueInput(false)

        }

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
                setFormOff={setFormOff}
                bgColor='rgba(139, 0, 0, 0.1)'
                setButton={setButton}
            >
                <FormBody borderColor='rgba(102, 0, 0, 0.1)'>
                    <FormTitle text='Informações de Saída' textColor='#660000' />
                    <View>
                        {
                            showEditNameInput
                                ? <EditNameInput actualName={expense.name} setName={setNewName} editName={editName} />
                                : <ActualName name={expense.name} setShowEditNameInput={setShowEditNameInput} />
                        }
                        <Text style={styles.labelContainer}>
                            <Text style={styles.label}>Data:</Text> {dateFormat(expense.date)}
                        </Text>
                        {
                            showEditValueInput
                                ? <EditValueInput
                                    setValue={setNewValue}
                                    editValue={editValue}
                                />
                                : <ActualValue
                                    name={expense.name}
                                    value={expense.value}
                                    setShowEditValueInput={setShowEditValueInput}
                                />
                        }
                        {
                            expense.amount && (
                                <Text style={styles.labelContainer}><Text style={styles.label}>Valor (un):</Text>{moneyFormat(expense.value / expense.amount)}</Text>
                            )
                        }
                        {
                            expense.amount && (
                                <Text style={styles.labelContainer}><Text style={styles.label}>Quantidade:</Text> {expense.amount}</Text>
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
                                    deleteFunction(expense)
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
    labelContainer: {
        marginBottom: 12
    },
    label: {
        fontWeight: 'bold'
    }
})