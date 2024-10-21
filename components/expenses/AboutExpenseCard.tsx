import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Expense } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'
import ConfirmDelete from '../common/ConfirmDelete'
import { Entypo } from '@expo/vector-icons'

interface AboutExpenseCardProps {
    expense: Expense
    deleteFunction: (expense: Expense) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutExpenseCard({ expense, deleteFunction, setFormOff }: AboutExpenseCardProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer setFormOff={setFormOff} bgColor='rgba(139, 0, 0, 0.1)'>
            <FormBody>
                <FormTitle text={expense.name}>
                    <Entypo name='info' size={18} color='darkgray' />
                </FormTitle>
                <View>
                    {
                        expense.category === 'resale' && (
                            <View>
                                <Text style={styles.labelContainer}><Text style={styles.label}>Quantidade:</Text> {expense.amount}</Text>
                                <Text style={styles.labelContainer}><Text style={styles.label}>Valor Unitário:</Text>{moneyFormat(expense.value / expense.amount)}</Text>
                            </View>
                        )
                    }
                    <Text style={styles.labelContainer}><Text style={styles.label}>Valor:</Text>{moneyFormat(expense.value)}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Data:</Text> {dateFormat(expense.date)}</Text>
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
    )

}

const styles = StyleSheet.create({
    labelContainer: {
        marginBottom: 4
    },
    label: {
        fontWeight: 'bold'
    }
})