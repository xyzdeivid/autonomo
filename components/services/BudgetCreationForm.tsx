import { Text } from "react-native"
import NameInput from "../common/NameInput"

interface BudgetCreationFormProps {
    setName: React.Dispatch<React.SetStateAction<string>>
}

export function BudgetCreationForm({ setName }: BudgetCreationFormProps) {

    return (
        <>
            <NameInput
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
            />
            <Text style={{ marginBottom: 20, color: '#330066' }}>
                O valor será definido ao registrar entrada.
            </Text>
        </>
    )

}