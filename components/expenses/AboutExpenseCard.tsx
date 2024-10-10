import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Expense } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { moneyFormat } from '@/functions/common'
import { useContext, useEffect } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'

interface AboutExpenseCardProps {
    expense: Expense
    deleteFunction: (expense: Expense) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutExpenseCard({ expense, deleteFunction, setFormOff }: AboutExpenseCardProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer setFormOff={setFormOff}>
            <FormBody>
                <FormTitle text='Sobre Despesa' />
                <View>
                    <Text><Text style={styles.label}>Despesa:</Text> {expense.name}</Text>
                    <Text><Text style={styles.label}>Valor:</Text>{moneyFormat(expense.value)}</Text>
                </View>
                <SubmitFormButtons
                    submit={() => deleteFunction(expense)}
                    submitButtonText='Excluir'
                    submitButtonColor='darkred'
                />
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    }
})