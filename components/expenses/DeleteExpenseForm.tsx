import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Expense } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { moneyFormat } from '@/functions/common'

interface DeleteExpenseFormProps {
    expense: Expense
    deleteFunction: (expense: Expense) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteExpenseForm({ expense, deleteFunction, setFormOff }: DeleteExpenseFormProps) {

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Sobre Despesa' />
                <View>
                    <Text><Text style={styles.label}>Despesa:</Text> {expense.name}</Text>
                    <Text><Text style={styles.label}>Valor:</Text>{moneyFormat(expense.value)}</Text>
                </View>
                <SubmitFormButtons
                    submit={() => deleteFunction(expense)}
                    setFormOff={setFormOff}
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