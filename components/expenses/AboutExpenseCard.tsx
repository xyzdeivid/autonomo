import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Expense } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import ConfirmDelete from '../common/ConfirmDelete'
import { Entypo } from '@expo/vector-icons'

interface AboutExpenseCardProps {
    expense: Expense
    deleteFunction: (expense: Expense) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutExpenseCard({ expense, deleteFunction, setFormOff, setButton }: AboutExpenseCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        setHideTabBar(true)
        setButton(false)
    }, [])

    return (
        <FormContainer
            setFormOff={setFormOff}
            bgColor='rgba(139, 0, 0, 0.1)'
            setButton={setButton}
        >
            <FormBody>
                <FormTitle text='Informações de Saída' textColor='#660000' />
                <View>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Nome:</Text> {expense.name}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Data:</Text> {dateFormat(expense.date)}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Valor:</Text>{moneyFormat(expense.value)}</Text>
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