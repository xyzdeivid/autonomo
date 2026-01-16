import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface ServiceCreationFormProps {
    name: string
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    setStep: React.Dispatch<React.SetStateAction<number>>
    submitService: () => Promise<void>
}

export default function ServiceCreationForm({ name, value, setName, setValue, setStep, submitService }: ServiceCreationFormProps) {

    const onComeBackButtonPress = () => {

        // Zerando estados ao sair do formulário
        setName('')
        setValue(0)
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
            <FormValueField
                setValue={setValue}
                bgColor={colors.items.min}
                textColor={colors.items.max}
            />
            {
                (name && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitService} />
                ) : null
            }
        </>
    )

}