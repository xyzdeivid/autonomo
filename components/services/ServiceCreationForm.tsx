import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'

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
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
                label='Nome do Serviço:'
            />
            <FormValueField
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            {
                (name && value) ? (
                    <SubmitItemButton color='#330066' onPress={submitService} />
                ) : null
            }
        </>
    )

}