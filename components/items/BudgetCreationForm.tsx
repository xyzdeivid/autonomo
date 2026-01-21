import { Text } from 'react-native'
import { FormNameField } from '../common/FormNameField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface BudgetCreationFormProps {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    submitBudget: () => Promise<void>
}

export function BudgetCreationForm({ name, setName, submitBudget }: BudgetCreationFormProps) {

    return (
        <>
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