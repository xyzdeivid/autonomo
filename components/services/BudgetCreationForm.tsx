import { Text } from 'react-native'
import { FormNameField } from '../common/FormNameField'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'

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
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
                label='Nome do Serviço:'
            />
            <Text style={{ marginBottom: 20, color: '#330066' }}>
                O valor será definido ao registrar entrada.
            </Text>
            {
                name && (
                    <SubmitItemButton color='#330066' onPress={submitBudget} />
                )
            }
        </>
    )

}