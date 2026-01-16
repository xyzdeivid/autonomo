import { Text } from 'react-native'
import { FormNameField } from '../common/FormNameField'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface BudgetCreationFormProps {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    setStep: React.Dispatch<React.SetStateAction<number>>
    submitBudget: () => Promise<void>
}

export function BudgetCreationForm({ name, setName, setStep, submitBudget }: BudgetCreationFormProps) {

    const onComeBackButtonPress = () => {

        // Zerando estados ao sair do formulário
        setName('')
        setStep(0)

    }

    return (
        <>
            <CreateItemFormHeader
                title='Novo Serviço'
                onComeBackButtonPress={onComeBackButtonPress}
            />
            <FormNameField
                setName={setName}
                textColor={colors.items.max}
                bgColor={colors.items.min}
                label='Nome do Serviço:'
            />
            <Text style={{ marginBottom: 20, color: colors.items.max }}>
                O valor será definido ao registrar entrada.
            </Text>
            {
                name && (
                    <SubmitItemButton color={colors.items.max} onPress={submitBudget} />
                )
            }
        </>
    )

}