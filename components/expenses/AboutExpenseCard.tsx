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
                <FormTitle text={expense.name} textColor='#660000'>
                    <Entypo name='info' size={18} color='rgba(139, 0, 0, 0.2)' />
                </FormTitle>
                <View>
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