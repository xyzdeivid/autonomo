import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'
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
            <NameInput
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
            />
            <NumberInput
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            {
                (name && value) ? (
                    <SubmitItemButton submitItem={submitService} />
                ) : null
            }
        </>
    )

}