import FormBody from './FormBody'
import FormContainer from './FormContainer'
import FormTitle from './FormTitle'
import SubmitFormButtons from './SubmitFormButtons'

interface DeleteServiceFormProps {
    targetName: string
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteServiceForm({ targetName, deleteFunction, setFormOff }: DeleteServiceFormProps) {

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Excluir ${targetName}?`} />
                <SubmitFormButtons submit={() => deleteFunction(targetName)} setFormOff={setFormOff} submitButtonText='Excluir' />
            </FormBody>
        </FormContainer>
    )

}