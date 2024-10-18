import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Expense } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
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
                <FormTitle text={expense.name} />
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
    labelContainer: {
        marginBottom: 4
    },
    label: {
        fontWeight: 'bold'
    }
})