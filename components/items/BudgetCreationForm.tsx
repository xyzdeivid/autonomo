import { Text } from 'react-native'
import { FormNameField } from '../common/FormNameField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface BudgetCreationFormProps {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    submitBudget: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
}

export function BudgetCreationForm({ name, setName, submitBudget, labelBgColor, inputBgColor }: BudgetCreationFormProps) {

    const theme = useGetTheme()

    return (
        <>
            <FormNameField
                setName={setName}
                label='Nome do Serviço'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            <Text style={{ marginBottom: 20, color: theme === 'dark' ? '#FFF' : colors.items.max }}>
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