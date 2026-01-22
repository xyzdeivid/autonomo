import { Text } from 'react-native'
import { FormNameField } from '../common/FormNameField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'

interface BudgetCreationFormProps {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    submitBudget: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
}

export function BudgetCreationForm({ name, setName, submitBudget, labelBgColor, inputBgColor, inputBorderColor }: BudgetCreationFormProps) {

    return (
        <>
            <FormNameField
                setName={setName}
                label='Nome do Serviço'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
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